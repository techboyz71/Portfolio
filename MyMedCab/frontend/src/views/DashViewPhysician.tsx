import { useEffect, useState } from "react";
import MapComponent from "../components/mapComponent";
import TableElement from "../components/TableElement";



import {
  LuIdCard,
  LuUserRound,
  LuUserSearch,
  LuCalendar,
} from "react-icons/lu";
import SettingsButtonList from "../components/SettingsButtonList";
import PrescriptionBuilder from "./PrescriptionBuilder";
import type { PrescriptionFormValues } from "./PrescriptionBuilder";

interface LoggedInPhysician {
  physicianId: number;
  firstName: string;
  lastName: string;
}

interface PatientTableRow {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface MedTableRow {
  prescriptionId: string;
  patientId: number;
  medId: number;
  pharmacyId: number;
  medicineName: string;
  dosage: number | string;
  formula: string;
  timeline: string;
  period: string;
  prescriptionDate: string;
  lastRefillDate: string | null;
  nextRefillDate: string | null;
  stockLevel: number | null;
  pharmacyLocation?: string | null;
  latitude: number | null;
  longitude: number | null;
}

export default function DashViewPhysician() {
  const [physician, setPhysician] = useState<LoggedInPhysician | null>(null);
  const [patients, setPatients] = useState<PatientTableRow[]>([]);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientTableRow | null>(null);
  const [medRows, setMedRows] = useState<MedTableRow[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingMeds, setLoadingMeds] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // builder state (create vs edit)
  const [builderMode, setBuilderMode] = useState<"create" | "edit">("create");
  const [builderInitialValues, setBuilderInitialValues] =
    useState<PrescriptionFormValues | null>(null);

  // bottom table selection + menu
  const [selectedPrescription, setSelectedPrescription] =
    useState<MedTableRow | null>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Load physician from localStorage and fetch patients
  useEffect(() => {
    const stored = localStorage.getItem("mymedcab_physician");
    console.log("RAW physician from storage:", stored);

    if (!stored) {
      console.error("No logged in physician in localStorage");
      return;
    }

    const parsed = JSON.parse(stored);
    console.log("Parsed physician:", parsed);

    const doc: LoggedInPhysician = {
      physicianId: Number(parsed.physicianId),
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    };

    setPhysician(doc);
    fetchPatients(doc.physicianId);
  }, []);

  const fetchPatients = async (physicianId: number) => {
    try {
      setLoadingPatients(true);
      setError(null);

      const res = await fetch(
        `http://localhost:5001/api/physicians/${physicianId}/patients`
      );

      const data = await res.json();
      console.log("Patients API response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to load patients");
      }

      const mapped: PatientTableRow[] = data.map((p: any) => ({
        id: p.patient_id,
        firstName: p.first_name,
        lastName: p.last_name,
        dateOfBirth: (p.dob || p.date_of_birth || "").slice(0, 10),
      }));

      setPatients(mapped);
    } catch (err: any) {
      console.error("Error loading patients:", err);
      setError(err.message ?? "Error loading patients");
    } finally {
      setLoadingPatients(false);
    }
  };

  const fetchMedsForPatient = async (patientId: number) => {
    try {
      setLoadingMeds(true);
      setError(null);

      const res = await fetch(
        `http://localhost:5001/api/physician-meds/${patientId}`
      );

      const data = await res.json();
      console.log("Meds API response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to load medications");
      }

      const mapped: MedTableRow[] = data.map((row: any) => ({
        prescriptionId:
          row.prescription_id != null
            ? String(row.prescription_id)
            : `${row.patient_id}-${row.med_id}`,
        patientId: row.patient_id,
        medId: row.med_id,
        pharmacyId: row.pharmacy_id,
        medicineName: row.medicine_name,
        dosage: row.dosage,
        formula: row.formula,
        timeline: row.timeline,
        period: row.period,
        prescriptionDate: row.prescription_date
          ? row.prescription_date.slice(0, 10)
          : "",
        lastRefillDate: row.last_refill_date
          ? row.last_refill_date.slice(0, 10)
          : null,
        nextRefillDate: row.next_refill_date
          ? row.next_refill_date.slice(0, 10)
          : null,
        stockLevel: row.stock_level ?? null,
        pharmacyLocation: row.pharmacy_location ?? null,
        latitude: row.latitude ?? null,
        longitude: row.longitude ?? null,
      }));

      setMedRows(mapped);
    } catch (err: any) {
      console.error("Error loading meds:", err);
      setError(err.message ?? "Error loading medications");
    } finally {
      setLoadingMeds(false);
    }
  };

  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [selectedPharmacyInfo, setSelectedPharmacyInfo] = useState<{
    name: string;
    stockLevel: number | null;
  } | null>(null);

  const handlePatientClick = (row: PatientTableRow) => {
    setSelectedPatient(row);
    setSelectedPrescription(null);
    setShowActionMenu(false);
    fetchMedsForPatient(row.id);
  };

  const handlePrescriptionClick = (row: MedTableRow) => {
    if (
      selectedPrescription &&
      selectedPrescription.prescriptionId === row.prescriptionId &&
      showActionMenu
    ) {
      setShowActionMenu(false);
      setSelectedPrescription(null);
      setSelectedCoords(null);
      setSelectedPharmacyInfo(null);
      return;
    }

    setSelectedPrescription(row);
    setShowActionMenu(true);

    // 🧭 move map to this pharmacy
    if (row.latitude != null && row.longitude != null) {
      setSelectedCoords({ lat: row.latitude, lng: row.longitude });
    } else {
      setSelectedCoords(null);
    }

    // 🏥 info for popup: all pharmacies are CVS + the city/location from DB
    setSelectedPharmacyInfo({
      name: row.pharmacyLocation ?? "Miami, FL",
      stockLevel: row.stockLevel ?? null,
    });
  };

  const handleEditClick = () => {
    if (!selectedPrescription) return;

    setBuilderMode("edit");

    setBuilderInitialValues({
      userId: String(selectedPrescription.patientId),
      medId: String(selectedPrescription.medId),
      dosage:
        selectedPrescription.dosage !== undefined &&
        selectedPrescription.dosage !== null
          ? String(selectedPrescription.dosage)
          : "",
      formula: selectedPrescription.formula ?? "",
      timeline:
        selectedPrescription.timeline !== undefined &&
        selectedPrescription.timeline !== null
          ? String(selectedPrescription.timeline)
          : "",
      period: selectedPrescription.period ?? "",
      prescriptionDate: selectedPrescription.prescriptionDate ?? "",
      lastRefill: selectedPrescription.lastRefillDate ?? "",
      nextRefill: selectedPrescription.nextRefillDate ?? "",
    });
  };

  const handleDeleteClick = async () => {
    if (!selectedPrescription) return;

    const ok = window.confirm(
      `Are you sure you want to delete ${selectedPrescription.prescriptionId}?`
    );

    if (!ok) return;

    try {
      setError(null);

      const res = await fetch(
        `http://localhost:5001/api/physician-meds/prescriptions/${selectedPrescription.prescriptionId}`,
        { method: "DELETE" }
      );

      const data = await res.json().catch(() => null);
      console.log("Delete response:", data);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete prescription");
      }

      setMedRows((prev) =>
        prev.filter(
          (m) => m.prescriptionId !== selectedPrescription.prescriptionId
        )
      );

      setSelectedPrescription(null);
      setShowActionMenu(false);
    } catch (err: any) {
      console.error("Error deleting prescription:", err);
      setError(err.message ?? "Error deleting prescription");
    }
  };

  const handleSaveEditedPrescription = async (
    values: PrescriptionFormValues
  ) => {
    if (!selectedPrescription) return;

    try {
      setError(null);

      const res = await fetch(
        `http://localhost:5001/api/physician-meds/medicine/${values.medId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // tell backend which patient to update
            user_id: selectedPrescription.patientId,

            dosage: values.dosage ? Number(values.dosage) : null,
            formula: values.formula || null,
            timeline: values.timeline || null,
            period: values.period || null,
            prescription_date: values.prescriptionDate || null,

            // match backend names: last_refill / next_refill
            last_refill: values.lastRefill || null,
            next_refill: values.nextRefill || null,
          }),
        }
      );

      const updated = await res.json();
      console.log("Update prescription response:", updated);

      if (!res.ok) {
        throw new Error(updated.error || "Failed to update prescription");
      }

      // update the bottom table row in the UI
      setMedRows((prev) =>
        prev.map((row) =>
          row.prescriptionId === selectedPrescription.prescriptionId
            ? {
                ...row,
                dosage: updated.dosage ?? row.dosage,
                formula: updated.formula ?? row.formula,
                timeline: updated.timeline ?? row.timeline,
                period: updated.period ?? row.period,
                prescriptionDate: updated.prescription_date
                  ? updated.prescription_date.slice(0, 10)
                  : row.prescriptionDate,
                lastRefillDate: updated.last_refill
                  ? updated.last_refill.slice(0, 10)
                  : row.lastRefillDate,
                nextRefillDate: updated.next_refill
                  ? updated.next_refill.slice(0, 10)
                  : row.nextRefillDate,
              }
            : row
        )
      );

      // reset builder state
      setBuilderMode("create");
      setBuilderInitialValues(null);
      setSelectedPrescription(null);
      setShowActionMenu(false);
    } catch (err: any) {
      console.error("Error saving prescription:", err);
      setError(err.message ?? "Error saving prescription");
    }
  };

  const handleCancelEdit = () => {
    setBuilderMode("create");
    setBuilderInitialValues(null);
    setSelectedPrescription(null);
    setShowActionMenu(false);
  };

  const handleCreatePrescription = async (values: PrescriptionFormValues) => {
    if (!physician) {
      alert("No logged-in physician found.");
      return;
    }
    if (!selectedPatient) {
      alert("Please select a patient first.");
      return;
    }

    try {
      setError(null);

      const patientId = Number(values.userId || selectedPatient.id);

      const res = await fetch(
        "http://localhost:5001/api/physician-meds/prescriptions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patient_id: Number(values.userId || selectedPatient.id),
            doctor_id: physician.physicianId,
            med_id: Number(values.medId),
            pharmacy_id: 1,
            prescription_date: values.prescriptionDate || null,
            last_refill_date: values.lastRefill || null,
            next_refill_date: values.nextRefill || null,

            // NEW: per-patient overrides that go into user_medicine
            dosage: values.dosage ? Number(values.dosage) : null,
            formula: values.formula || null,
            timeline: values.timeline || null,
            period: values.period || null,
          }),
        }
      );

      const data = await res.json();
      console.log("Create prescription response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to create prescription");
      }

      // pull fresh data for that patient from the view
      await fetchMedsForPatient(patientId);

      // Reset builder / selection
      setBuilderMode("create");
      setBuilderInitialValues(null);
      setSelectedPrescription(null);
      setShowActionMenu(false);
    } catch (err: any) {
      console.error("Error creating prescription:", err);
      setError(err.message || "Error creating prescription");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-white p-4">
      <div className="flex justify-center w-full mx-0 py-4 px-9 border-2 border-green-200 bg-white rounded-2xl shadow-2xl shadow-accent-200">
        <p className="font-bold text-gray-900 text-2xl">My Dashboard</p>
        <div className="flex ml-auto">
          <SettingsButtonList />
        </div>
      </div>

      {/* Main content: left tables + right panel */}
      <div className="flex flex-4 h-full w-full gap-6 p-4">
        {/* LEFT SIDE: patients + prescriptions */}
        <div className="w-3/4 gap-6 flex flex-col">
          {/* Top: patients table */}
          <div className="flex h-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-200 border-2 border-accent-100">
            {loadingPatients ? (
              <div className="m-auto text-sm text-gray-600">
                Loading patients...
              </div>
            ) : (
              <TableElement
                headersData={[
                  { label: "ID", icon: <LuIdCard /> },
                  { label: "FIRST NAME", icon: <LuUserRound /> },
                  { label: "LAST NAME", icon: <LuUserSearch /> },
                  { label: "DATE OF BIRTH", icon: <LuCalendar /> },
                ]}
                data={patients}
                className="w-full"
                onRowClick={handlePatientClick}
              />
            )}
          </div>

          {/* Bottom: prescriptions table */}
          <div className="flex flex-col h-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-200 border-2 border-accent-100">
            {/* Commented this, no need i guess */}

            {/* <div className="px-4 pt-2 text-xs text-gray-700">
              {selectedPatient
                ? `Showing prescriptions for ${selectedPatient.firstName} ${selectedPatient.lastName}`
                : "Click a patient above to view their prescriptions."}
            </div> */}

            <div className="flex-1">
              {loadingMeds ? (
                <div className="m-auto text-sm text-gray-600">
                  Loading medications...
                </div>
              ) : (
                <>
                  <TableElement
                    headersData={[
                      { label: "MEDICINE NAME", icon: <LuUserRound /> },
                      { label: "DOSAGE", icon: <LuUserSearch /> },
                      { label: "FORMULA", icon: <LuUserSearch /> },
                      { label: "TIMELINE", icon: <LuUserSearch /> },
                      { label: "PERIOD", icon: <LuUserSearch /> },
                      { label: "PRESCRIPTION DATE", icon: <LuCalendar /> },
                      { label: "LAST REFILL DATE", icon: <LuCalendar /> },
                      { label: "NEXT REFILL DATE", icon: <LuCalendar /> },
                    ]}
                    data={medRows}
                    className="w-full"
                    onRowClick={handlePrescriptionClick}
                  />

                  {selectedPatient &&
                    selectedPrescription &&
                    showActionMenu && (
                      <div className="px-4 pb-3">
                        <div className="mt-2 bg-white border border-green-300 rounded-2xl shadow-md p-3 flex items-center justify-between transform transition-all duration-200 ease-out">
                          <div className="text-xs text-gray-700">
                            <div className="font-semibold mb-1">
                              Selected prescription for{" "}
                              {selectedPatient.firstName}{" "}
                              {selectedPatient.lastName}
                            </div>
                            <div>
                              <span className="font-mono">
                                {selectedPrescription.prescriptionId}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleEditClick}
                              className="px-10 py-2 rounded-xl text-md font-semibold bg-container-500 text-white hover:bg-blue-400 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={handleDeleteClick}
                              className="px-10 py-1 rounded-xl text-md font-semibold bg-accent-500 text-white hover:bg-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: prescription builder + map */}
        <div className="w-1/4 gap-6 flex flex-col">
          <div className="flex flex-col h-3/4 w-full rounded-2xl shadow-2xl border-2 border-green-400 overflow-hidden">
            <div className="bg-green-500 text-white font-semibold text-center py-2">
              Prescription Builder
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <PrescriptionBuilder
                mode={builderMode}
                initialValues={builderInitialValues}
                onSaveEdit={handleSaveEditedPrescription}
                onCancelEdit={handleCancelEdit}
                onCreate={handleCreatePrescription}
              />
            </div>
          </div>

          <div className="flex justify-center items-center h-1/2 bg-gray-100 rounded-3xl shadow-2xl shadow-accent-200 border-2 border-green-200">
            <MapComponent
              className="w-full h-full overflow-auto rounded-2xl"
              selectedCoords={selectedCoords}
              selectedPharmacy={selectedPharmacyInfo}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center text-xs mt-2">{error}</div>
      )}
    </div>
  );
}

