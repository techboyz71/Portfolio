import express from 'express';
import { pool } from './db';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { firstName, lastName, dob } = req.body;

    if(!firstName || !lastName || !dob){
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        const result = await pool.query(
            `SELECT * FROM users
             WHERE LOWER(first_name) = LOWER($1)
               AND LOWER(last_name) = LOWER($2)
               AND dob = $3`,
            [firstName, lastName, dob]
          );          

        if(result.rows.length > 0) {
            return res.status(200).json({
                message: "This user exists. Login successful!",
                user: result.rows[0],
            });
        }

        const insert = await pool.query(
            'INSERT INTO users(first_name, last_name, dob) VALUES ($1, $2, $3) RETURNING *',
            [firstName, lastName, dob]
        );

        res.status(201).json({
            message: 'New user successfully created and signed in.',
            user: insert.rows[0],
        });
    } catch(e){
        console.error(e);
        res.status(500).json({ error: 'Database error'});
    }
});

router.post('/doctor-login', async (req, res) => {
    const { doctor_name, doctor_id, doctor_specialty } = req.body;

    if(!doctor_name || !doctor_id || !doctor_specialty){
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await pool.query(
            `SELECT * FROM physician
             WHERE LOWER(doctor_name) = LOWER($1)
               AND doctor_id = $2
               AND LOWER(doctor_specialty) = LOWER($3)`,
            [doctor_name, doctor_id, doctor_specialty]
          );
          

        if(result.rows.length > 0) {
            return res.status(200).json({
                message: "This physician exists. Login successful!",
                doctor: result.rows[0]
            });
        }

        const insert = await pool.query(
            'INSERT INTO physician(doctor_name, doctor_id, doctor_specialty) VALUES ($1, $2, $3) RETURNING *',
            [doctor_name, doctor_id, doctor_specialty]
        );

        res.status(201).json({
            message: 'New physician successfully created and signed in.',
            physician: insert.rows[0],
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Database error'});
    }
});

// GET request for an dictionary of all the doctor names
router.get('/doctors_names', async (req, res) => {
    try {
        const result = await pool.query('SELECT doctor_name FROM physician ORDER BY doctor_name ASC')
        const doctorNames = result.rows.map(row => row.doctor_name);
        res.status(200).json({ doctors: doctorNames});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving doctor names'})
    }
});

// GET request for a dictionary of all the doctor ids
router.get('/doctors_id', async (req, res) => {
    try {
        const result = await pool.query('SELECT doctor_id FROM physician ORDER BY doctor_id ASC')
        const doctorIds = result.rows.map(row => row.doctor_id);
        res.status(200).json({ doctors: doctorIds});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving doctor ids'})
    }
});

// GET request for a dictionary of all the doctor rows
router.get('/doctors_rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM physician ORDER BY doctor_id ASC')
        //const physicianIds = result.rows.map(row => row.physician_id);
        res.status(200).json({ doctors_rows: result.rows});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving doctor rows'})
    }
});

// GET request for a dictionary of all the pharmacy ids
router.get('/pharmacy_id', async (req, res) => {
    try {
        const result = await pool.query('SELECT pharmacy_id FROM pharmacy ORDER BY pharmacy_id ASC')
        const pharmacyIds = result.rows.map(row => row.pharmacy_id);
        res.status(200).json({ pharmacies: pharmacyIds});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving pharmacy ids'})
    }
});

// GET request for a dictionary of all the pharmacy rows
router.get('/pharmacy_rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pharmacy ORDER BY pharmacy_id ASC')
        //const pharmacyIds = result.rows.map(row => row.pharmacy_id);
        res.status(200).json({ pharmacy_rows: result.rows});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving pharmacy rows'})
    }
});

// GET request for a dictionary of all the prescription ids
router.get('/prescription_id', async (req, res) => {
    try {
        const result = await pool.query('SELECT prescription_id FROM prescription ORDER BY prescription_id ASC')
        const prescriptionIds = result.rows.map(row => row.prescription_id);
        res.status(200).json({ prescriptions: prescriptionIds});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving prescription ids'})
    }
});

// GET request for a dictionary of all the prescription rows
router.get('/prescription_rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM prescription ORDER BY prescription_id ASC')
        //const prescriptionIds = result.rows.map(row => row.prescription_id);
        res.status(200).json({ prescription_rows: result.rows});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving prescription rows'})
    }
});

// GET request for a dictionary of all the patient ids
router.get('/patient_id', async (req, res) => {
    try {
        const result = await pool.query('SELECT patient_id FROM users ORDER BY patient_id ASC')
        const patientIds = result.rows.map(row => row.patient_id);
        res.status(200).json({ patients: patientIds});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving patient ids'})
    }
});

// GET request for a dictionary of all the patient rows
router.get('/patient_rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY patient_id ASC')
        //const patientIds = result.rows.map(row => row.patient_id);
        res.status(200).json({ patient_rows: result.rows});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving patient rows'})
    }
});

// GET request for a dictionary of all the medicine ids
router.get('/medicine_id', async (req, res) => {
    try {
        const result = await pool.query('SELECT med_id FROM medicine ORDER BY med_id ASC')
        const medicineIds = result.rows.map(row => row.med_id);
        res.status(200).json({ medicines: medicineIds});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving medicine ids'})
    }
});

// GET request for a dictionary of all the medicine rows
router.get('/medicine_rows', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medicine ORDER BY med_id ASC')
        //const medicineIds = result.rows.map(row => row.med_id);
        res.status(200).json({ medicine_rows: result.rows});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error retrieving medicine rows'})
    }
});

// GET all patients assigned to a given physician/doctor
router.get('/physicians/:physicianId/patients', async (req, res) => {
    const { physicianId } = req.params;

    try {
        // We can use the view directly since it already has patient + doctor info
        const result = await pool.query(
            `
            SELECT DISTINCT
                patient_id,
                first_name,
                last_name,
                dob
            FROM physician_medicine_view
            WHERE doctor_id = $1          -- 👈 note: doctor_id, not physician_id
            ORDER BY patient_id;
            `,
            [physicianId]
        );

        res.status(200).json(result.rows);
    } catch (e) {
        console.error('Error retrieving patients for physician:', e);
        res.status(500).json({ error: 'Error retrieving patients for physician' });
    }
});



export default router;
