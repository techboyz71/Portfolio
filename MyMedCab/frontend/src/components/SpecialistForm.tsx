import { useState } from "react";
import MedLogo from "../assets/images/myMedCabLogoOnly.png";
import { sizes } from "../constants/GlobalSize";
import ButtonComponent from "./ButtonComponent";
import InputField from "./InputField";
import { loginDoctor } from "../services/api";
import type { DoctorLoginData } from "../services/api";
import { useNavigate } from "react-router-dom";

// Specialities
const specialties = [
  "Internal Medicine",
  "Rheumatology",
  "Pediatrics",
  "Endocrinology",
  "Gastroenterology",
  "Obstetrics",
  "Family Medicine",
  "Nephrology",
  "Cardiology",
  "Gynecology",
  "Pulmonology",
  "Surgery",
  "Dermatology",
  "Urology",
  "Oncology",
  "Infectious Disease",
  "Anesthesiology",
  "Pathology",
  "Ophthalmology",
  "Orthopedics",
  "Emergency Medicine",
  "Hematology",
  "Psychiatry",
  "Otolaryngology",
  "Neurology",
];

// Database structure for specialist login
interface FormData {
  specialistName: string;
  specialistID: string;
  specialistSpecialty: string;
}

// Props for SpecialistForm to handle form switching
interface SpecialistFormProps {
  onSwitchToPatient?: () => void; // Future use if needed
}

// main function
export default function SpecialistForm({
  onSwitchToPatient,
}: SpecialistFormProps) {
  const [formData, setFormData] = useState<FormData>({
    specialistName: "",
    specialistID: "",
    specialistSpecialty: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange =
    (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // avoid full page reload
    setIsLoading(true);
    setError("");

    try {
      // Map frontend data to backend format
      const apiData: DoctorLoginData = {
        doctor_name: formData.specialistName,
        doctor_id: formData.specialistID,
        doctor_specialty: formData.specialistSpecialty,
      };

      const result = await loginDoctor(apiData);

      console.log("Success:", result.message);
      console.log("Doctor data:", result.doctor || result.physician);

      const doctor = result.doctor || result.physician;

      if (doctor) {
        // 🔐 Save logged-in physician so DashViewPhysician can read it
        // Split full name properly
const nameParts = formData.specialistName.trim().split(" ");
const first = nameParts[0] || "";
const last = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

localStorage.setItem(
  "mymedcab_physician",
  JSON.stringify({
    physicianId: Number(
      doctor.physician_id ?? doctor.doctor_id ?? formData.specialistID
    ),
    firstName: doctor.first_name || first,
    lastName: doctor.last_name || last,
  })
);


        // 🌐 Redirect to physician dashboard
        navigate("/dashboard/physician");
      } else {
        setError("Login did not return a doctor record.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }

    console.log("Submitting Specialist Data:", formData);
  };

  return (
    <>
      <div className="flex min-h-full h-screen flex-col justify-center px-8 py-20 lg:px-12 bg-blue-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <img src={MedLogo} alt="MyMedCab Logo" className="mx-auto h-30" />

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Specialist Login Portal
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* onSubmit Handles all data inside the container */}
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <InputField
              inputName="SpecialistName"
              inputType="text"
              placeholder="Enter Name"
              label="Specialist Name"
              onChange={handleChange("specialistName")}
              inputValue={formData.specialistName}
              required
            />

            <InputField
              inputName="SpecialistID"
              inputType="text"
              placeholder="Enter your ID"
              label="Specialist ID"
              onChange={handleChange("specialistID")}
              inputValue={formData.specialistID}
              required
            />

            {/* Dropdownlist for the specialty */}
            <div>
              <label
                htmlFor="specialistSpecialty"
                className="block text-sm font-medium text-white mb-1"
              >
                Specialty
              </label>
              <select
                id="specialistSpecialty"
                name="specialistSpecialty"
                value={formData.specialistSpecialty}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specialistSpecialty: e.target.value,
                  }))
                }
                required
                className="block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm 
             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              >
                <option value="">-- Select Specialty --</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Implement error handling display */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div
              className={`flex justify-center items-center ${sizes.gapMedium}`}
            >
              {/* submit button */}
              {isLoading ? (
                <div className="text-center text-white">Loading...</div>
              ) : (
                <ButtonComponent
                  label="Login"
                  onClick={() => {
                    console.log("Login clicked");
                  }}
                  type="submit"
                  size="medium"
                  fullWidth={true}
                  className="bg-indigo-700 hover:bg-indigo-500 text-white"
                />
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a doctor?{" "}
            <button
              type="button"
              onClick={onSwitchToPatient}
              className="font-semibold text-container-200 hover:text-container-100"
            >
              Patient Portal Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
