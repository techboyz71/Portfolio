import express from "express";
import { pool } from "./db"
import dotenv from "dotenv";
import authRoutes from './authRoutes';
import cors from "cors";
import physicianMedicineRoutes from "./physicianMedicine";
import patientMedicineRoutes from "./patientMedicine";

dotenv.config();


const PORT = process.env.PORT || 5001;


const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', authRoutes);
app.use('/api/patient-meds', patientMedicineRoutes);      // read-only view for patients
app.use('/api/physician-meds', physicianMedicineRoutes);  // full doctor view

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
