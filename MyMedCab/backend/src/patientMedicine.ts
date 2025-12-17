import express from "express";
import { pool } from './db';

const router = express.Router();

// 🔹 Get doctor info for a given patient
router.get("/:patient_id/doctor", async (req, res) => {
    try {
      const { patient_id } = req.params;
  
      const result = await pool.query(
        `
        SELECT
          d.doctor_id,
          d.doctor_name,
          d.doctor_specialty
        FROM users u
        JOIN physician d ON u.doctor_id = d.doctor_id
        WHERE u.patient_id = $1
        `,
        [patient_id]
      );
  
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "No doctor found for this patient" });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Failed to fetch doctor info", err);
      res.status(500).json({ error: "Failed to fetch doctor info" });
    }
  });

// Patient's medications - retrieve them. This will be visible to them (READ-ONLY FORMAT - USERS CANNOT EDIT)
router.get("/:patient_id", async(req, res) => {
    try{
        const { patient_id } = req.params;
        const result = await pool.query(
            'SELECT * FROM user_medication_view WHERE patient_id = $1',
            [patient_id]
        );
        res.json(result.rows);
    } catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch patient medications" });
    }
});

export default router;