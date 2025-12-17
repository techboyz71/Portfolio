import { useEffect, useState } from "react";
import MapComponent from "../components/mapComponent";
import TableElement from "../components/TableElement";
import maleProPic from "../assets/images/avatarPhotoMale.jpg";
import femaleProPic from "../assets/images/avatarPhotoFemale.jpg";

// patients icons
import { LuUserRound, LuUserSearch, LuCalendar } from "react-icons/lu";

//prescription icons

import { GiMedicinePills } from "react-icons/gi"; //medicine icon
import { GiMedicines } from "react-icons/gi"; // dosage icon
import { SlChemistry } from "react-icons/sl"; // formula icon

import { IoMdTime } from "react-icons/io";
import SettingsButtonList from "../components/SettingsButtonList";
import MedicineInfoSection from "./MedicineInfoSection";

interface LoggedInPatient {
  patientId: number;
  firstName: string;
  lastName: string;
  dob: string;
}

interface PatientTableRow {
  id: number | string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

// This is what the *bottom* table will expect
interface MedTableRow {
  id: number | string; // we’ll use user_med_id
  medicineName: string; //this
  dosage: number | string; //this
  formula: string;
  timeline: string;
  period: string;
  stockLevel: number | null;
  prescriptionDate: string; // dates will come as strings from the API
  // lastRefillDate: string | null;
  // nextRefillDate: string | null;

  pharmacyLocation?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface DoctorInfo {
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
}


function DashView() {
  // Top table data: one row for the logged-in patient
  const [patientRows, setPatientRows] = useState<PatientTableRow[]>([]);

  // Bottom table data: meds/vitals for that patient
  const [medRows, setMedRows] = useState<MedTableRow[]>([]);

  // NEW: doctor info for the top-right card
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);

  // NEW: currently selected medicine row
  const [selectedMed, setSelectedMed] = useState<MedTableRow | null>(null);

  // NEW: map position + popup info
  const [selectedCoords, setSelectedCoords] =
        useState<{ lat: number; lng: number } | null>(null);
  
  const [selectedPharmacyInfo, setSelectedPharmacyInfo] =
  useState<{ name: string; stockLevel: number | null } | null>(null);

  const handleMedClick = (row: MedTableRow) => {
    setSelectedMed(row);
  
    // Move map if we have coordinates
    if (row.latitude != null && row.longitude != null) {
      setSelectedCoords({ lat: row.latitude, lng: row.longitude });
    } else {
      setSelectedCoords(null);
    }
  
    // Info for map popup
    setSelectedPharmacyInfo({
      name: row.pharmacyLocation ?? "Pharmacy location coming soon...",
      stockLevel: row.stockLevel ?? null,
    });
  };
  

  useEffect(() => {
    const stored = localStorage.getItem("mymedcab_patient");

    if (!stored) {
      console.error("No logged-in patient found. Please log in again.");
      return;
    }

    const patient: LoggedInPatient = JSON.parse(stored);

    // 👉 Fill TOP table with this patient's own info
    setPatientRows([
      {
        id: patient.patientId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dob.slice(0, 10),
      },
    ]);

    // 👉 Fill TOP table with this patient's own info
      setPatientRows([
        {
          id: patient.patientId,
          firstName: patient.firstName,
          lastName: patient.lastName,
          dateOfBirth: patient.dob.slice(0, 10),
        },
      ]);


      // 👉 Fetch doctor info for this patient
    const fetchDoctor = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/patient-meds/${patient.patientId}/doctor`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load doctor info");
        }

        setDoctorInfo({
          doctorId: data.doctor_id,
          doctorName: data.doctor_name,
          doctorSpecialty: data.doctor_specialty,
        });
      } catch (err) {
        console.error("Failed to load doctor info", err);
      }
    };

    fetchDoctor();


    // 👉 Fetch meds/vitals for BOTTOM table
    const fetchMeds = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/patient-meds/${patient.patientId}`
        );
        const data = await res.json();
        console.log("patient meds response:", data); // 🔍 helpful log
    
        if (!res.ok) {
          throw new Error(data.error || "Failed to load medications");
        }
    
        const mapped: MedTableRow[] = data.map((row: any) => ({
          id: row.user_med_id,                 // PK from user_medication_view
          medicineName: row.medicine_name,
          dosage: row.dosage,
          formula: row.formula,
          timeline: row.timeline,
          period: row.period,
          stockLevel: row.stock_level ?? null, // not shown to user, but we keep it
          prescriptionDate: row.prescription_date
            ? row.prescription_date.slice(0, 10)
            : "",
          // lastRefillDate: row.last_refill_date
          //   ? row.last_refill_date.slice(0, 10)
          //   : null,
          // nextRefillDate: row.next_refill_date
          //   ? row.next_refill_date.slice(0, 10)
          //   : null,
          pharmacyLocation: row.pharmacy_location ?? null,
          latitude: row.latitude ?? null,
          longitude: row.longitude ?? null,
        }));
    
        setMedRows(mapped);
      } catch (err: any) {
        console.error("Failed to load data", err);
      }
    };
    
    fetchMeds();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-white p-4">
      {/* Top Nav Bar */}
      <div className="flex justify-center w-full mx-0 py-4 px-9 border-2 border-green-200 bg-white rounded-2xl shadow-2xl shadow-accent-200">
        <p className="font-bold text-gray-900 text-2xl">My Dashboard</p>
        <div className="flex ml-auto">
          <SettingsButtonList />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-4 h-full w-full gap-6 p-4">
        {/* Center Side (50%) */}

        {/* Info section */}
        <div className="w-3/4 gap-8 flex flex-col justify-between">
          {/* NEW Split Containers */}
          <div className="flex h-1/2 w-full gap-6">
            {/* Patient Info Container */}
            <div className="w-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-500 border-2 border-accent-100 p-10 flex flex-col">
              <h1 className="text-3xl font-bold text-center">
                Patient Information
              </h1>

              <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-accent-200 mb-8 mt-8">
                <img src={femaleProPic} alt="patient profile" />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-5xl font-semibold">
                  {patientRows.length > 0
                    ? `${patientRows[0].firstName} ${patientRows[0].lastName}`
                    : "Loading..."}
                </p>

                <p className="text-2xl">
                  Patient ID:{" "}
                  {patientRows.length > 0 ? patientRows[0].id : "Loading..."}
                </p>

                <p className="text-2xl">
                  Date of Birth:{" "}
                  {patientRows.length > 0
                    ? patientRows[0].dateOfBirth
                    : "Loading..."}
                </p>
              </div>
            </div>

            {/* Physician Info Container */}
            <div className="w-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-500 border-2 border-accent-100 p-10 flex flex-col">
              <h1 className="text-3xl font-bold text-center">
                Physician Information
              </h1>

              <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-accent-200 mb-8 mt-8">
                <img src={maleProPic} alt="physician profile" />
              </div>
              <div className="flex flex-col gap-4">
              <p className="text-5xl font-semibold">
                {doctorInfo ? doctorInfo.doctorName : "Loading..."}
              </p>

              <p className="text-2xl">
                Speciality:{" "}
                {doctorInfo ? doctorInfo.doctorSpecialty : "Loading..."}
              </p>

              <p className="text-2xl">
                Hospital Location: Miami, Fl
              </p>
              </div>
            </div>
          </div>
          {/* END New Split Containers */}
          {/* Table 2 */}
          <div className="flex h-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-200 border-2 border-accent-100">
            <TableElement
              headersData={[
                { label: "MEDICINE NAME", icon: <GiMedicinePills /> },
                { label: "DOSAGE", icon: <GiMedicines /> },
                { label: "FORMULA", icon: <SlChemistry /> },
                { label: "TIMELINE", icon: <IoMdTime /> },
                { label: "PERIOD", icon: <IoMdTime /> },
                { label: "PRESCRIPTION DATE", icon: <LuCalendar /> },
                // { label: "LAST REFILL DATE", icon: <LuCalendar /> },
                // { label: "NEXT REFILL DATE", icon: <LuCalendar /> },
              ]}
              data={medRows} // <-- important: use medRows, not dummyPatients
              className="w-full"
              onRowClick={handleMedClick}
            />
          </div>
        </div>

        {/* Right Side (25%) */}
        <div className="w-1/4 gap-6 flex flex-col">
          {/* Prescription Builder container with green banner */}
          <div className="flex flex-col h-1/2 w-full rounded-2xl shadow-2xl border-2 border-green-400 overflow-hidden">
            <div className="bg-green-500 text-white font-semibold text-center py-2">
              Medicine Information
            </div>
            <div className="flex-1 p-4 overflow-auto">
            <MedicineInfoSection
              medicineName={selectedMed?.medicineName}
              dosage={selectedMed?.dosage}
              formula={selectedMed?.formula}
              timeline={selectedMed?.timeline}
              period={selectedMed?.period}
              prescriptionDate={selectedMed?.prescriptionDate}
            />
            </div>
          </div>

          {/* Map container */}
          <div className="flex justify-center items-center h-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-200 border-2 border-green-200">
          <MapComponent
            className="w-full h-full overflow-auto rounded-2xl"
            selectedCoords={selectedCoords}
            selectedPharmacy={selectedPharmacyInfo}
          />
          </div>
        </div>
      </div>
        
    </div>
  );
}
export default DashView;