import express, { Request, Response } from "express";
import { pool } from "./db";

const router = express.Router();

// GET /physician-meds/:patient_id
router.get("/:patient_id", async (req: Request, res: Response) => {
  try {
    const { patient_id } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM physician_medicine_view
       WHERE patient_id = $1
       ORDER BY prescription_date DESC, med_id`,
      [patient_id]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch physician view" });
  }
});

// PUT /api/physician-meds/medicine/:medId  (edit prescription for ONE patient)
router.put("/medicine/:medId", async (req: Request, res: Response) => {
  const medId = Number(req.params.medId);

  const {
    user_id,               // patient id
    dosage,
    formula,
    timeline,
    period,
    prescription_date,
    last_refill,           // match user_medicine column
    next_refill,           // match user_medicine column
  } = req.body;

  if (!user_id || !medId) {
    return res.status(400).json({ error: "Missing user_id or medId" });
  }

  try {
    await pool.query("BEGIN");

    // 🔹 Update EVERYTHING that is patient-specific in user_medicine
    const umResult = await pool.query(
      `
      UPDATE user_medicine
      SET
        dosage            = COALESCE($1, dosage),
        formula           = COALESCE($2, formula),
        timeline          = COALESCE($3, timeline),
        period            = COALESCE($4, period),
        prescription_date = COALESCE($5, prescription_date),
        last_refill       = COALESCE($6, last_refill),
        next_refill       = COALESCE($7, next_refill)
      WHERE user_id = $8 AND med_id = $9
      RETURNING *;
      `,
      [
        // if dosage is "", undefined, or null -> keep existing
        dosage !== undefined && dosage !== null && dosage !== ""
          ? Number(dosage)
          : null,
        formula ?? null,
        timeline ?? null,
        period ?? null,
        prescription_date ?? null,
        last_refill ?? null,
        next_refill ?? null,
        user_id,
        medId,
      ]
    );

    if (umResult.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "User_medicine row not found" });
    }

    await pool.query("COMMIT");

    const um = umResult.rows[0];

    // Shape that DashViewPhysician expects
    return res.json({
      dosage: um.dosage,
      formula: um.formula,
      timeline: um.timeline,
      period: um.period,
      prescription_date: um.prescription_date,
      last_refill: um.last_refill,
      next_refill: um.next_refill,
      med_id: um.med_id,
      user_id: um.user_id,
    });
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ error: "Failed to update prescription" });
  }
});





// POST /physician-meds/prescriptions  (create a new prescription)
router.post("/prescriptions", async (req: Request, res: Response) => {
  try {
    const {
      patient_id,
      doctor_id,
      med_id,
      pharmacy_id,
      // dates
      prescription_date,
      last_refill_date,
      next_refill_date,
      stock_level,
      // 🔹 per-patient overrides
      dosage,
      formula,
      timeline,
      period,
    } = req.body;

    if (!patient_id || !doctor_id || !med_id || !pharmacy_id) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    await pool.query("BEGIN");

    // 🔹 0) Get a base stock from an existing user_medicine row for this med
    const stockRow = await pool.query(
      `
      SELECT stock_level
      FROM user_medicine
      WHERE med_id = $1
      ORDER BY user_med_id DESC
      LIMIT 1
      `,
      [med_id]
    );

    const baseStockLevel =
    stockRow.rows.length > 0 && stockRow.rows[0].stock_level != null
    ? stockRow.rows[0].stock_level
    : 0;


    // 1) Generate next RX ID based on the *whole* prescription table
    const idResult = await pool.query(`
      SELECT prescription_id
      FROM prescription
      WHERE prescription_id LIKE 'RX____'   -- RX + 4 digits
      ORDER BY prescription_id DESC
      LIMIT 1
    `);

    let nextId = "RX0001";
    if (idResult.rows.length > 0) {
      const last = idResult.rows[0].prescription_id as string; // e.g. "RX0220"
      const num = parseInt(last.slice(2), 10) + 1;             // 220 + 1
      nextId = "RX" + num.toString().padStart(4, "0");         // "RX0221"
    }

    // 2) Insert into prescription (header)
    const rxResult = await pool.query(
      `
      INSERT INTO prescription (
        prescription_id,
        patient_id,
        med_id,
        pharmacy_id,
        doctor_id,
        prescription_date
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *;
      `,
      [
        nextId,
        patient_id,
        med_id,
        pharmacy_id,
        doctor_id,
        prescription_date ?? new Date(),
      ]
    );

    // 3) Insert into user_medicine (per-patient data)
    const umResult = await pool.query(
      `
      INSERT INTO user_medicine (
        user_id,
        med_id,
        stock_level,
        prescription_date,
        last_refill,
        next_refill,
        dosage,
        formula,
        timeline,
        period
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
      `,
      [
        patient_id,
        med_id,
        baseStockLevel,
        prescription_date ?? new Date(),
        last_refill_date ?? null,
        next_refill_date ?? null,
        dosage !== undefined && dosage !== null ? Number(dosage) : null,
        formula ?? null,
        timeline ?? null,
        period ?? null,
      ]
    );

    await pool.query("COMMIT");

    return res.status(201).json({
      prescription: rxResult.rows[0],
      user_medicine: umResult.rows[0],
    });
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ error: "Failed to create prescription" });
  }
});





// DELETE /physician-meds/prescriptions/:id
router.delete("/prescriptions/:id", async (req, res) => {
  const { id } = req.params; // e.g. 'RX0401'

  try {
    await pool.query("BEGIN");

    // 1) Find the (patient_id, med_id) for this prescription
    const rxResult = await pool.query(
      `
      SELECT patient_id, med_id
      FROM prescription
      WHERE prescription_id = $1
      `,
      [id]
    );

    if (rxResult.rowCount === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Prescription not found" });
    }

    const { patient_id, med_id } = rxResult.rows[0];

    // 2) Delete that specific row from user_medicine (per patient!)
    await pool.query(
      `
      DELETE FROM user_medicine
      WHERE user_id = $1 AND med_id = $2
      `,
      [patient_id, med_id]
    );

    // 3) Delete the prescription header
    await pool.query(
      `DELETE FROM prescription WHERE prescription_id = $1`,
      [id]
    );

    await pool.query("COMMIT");
    return res.json({ message: "Prescription deleted" });
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e);
    return res.status(500).json({ error: "Failed to delete prescription" });
  }
});



// PATCH /physician-meds/patient/:patient_id/vitals  (update patient vitals)
router.patch("/patient/:patient_id/vitals", async (req: Request, res: Response) => {
  try {
    const { patient_id } = req.params;
    const { blood_sugar, systolic, diastolic, weight } = req.body;

    const fields: string[] = [];
    const values: any[] = [];
    let i = 1;

    if (blood_sugar !== undefined) { fields.push(`blood_sugar = $${i++}`); values.push(blood_sugar); }
    if (systolic !== undefined)    { fields.push(`systolic = $${i++}`);    values.push(systolic); }
    if (diastolic !== undefined)   { fields.push(`diastolic = $${i++}`);   values.push(diastolic); }
    if (weight !== undefined)      { fields.push(`weight = $${i++}`);      values.push(weight); }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No vitals to update" });
    }

    values.push(patient_id);

    const sql = `
      UPDATE physician_medicine_view
      SET ${fields.join(", ")}
      WHERE patient_id = $${i}
      RETURNING *;
    `;

    const { rows } = await pool.query(sql, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update vitals" });
  }
});


export default router;
