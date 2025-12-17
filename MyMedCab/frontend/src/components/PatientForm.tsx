import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedLogo from "../assets/images/myMedCabLogoOnly.png";
import { sizes } from "../constants/GlobalSize";
import ButtonComponent from "./ButtonComponent";
import InputField from "./InputField";

// Database structure for patient login
interface PatientFormData {
  patientName: string;
  patientID: string;
  dateOfBirth: string;
}

// Props for PatientForm to handle form switching
interface PatientFormProps {
  onSwitchToSpecialist?: () => void;
}

interface LoggedInPatient {
  patientId: number;
  firstName: string;
  lastName: string;
  dob: string;
}

export default function PatientForm({
  onSwitchToSpecialist,
}: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    patientName: "",
    patientID: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();
  //   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     dateOfBirth: e.target.value, // will always be YYYY-MM-DD
  //   }));
  // };
  const handleChange =
    (fieldName: keyof PatientFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
    };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault(); // avoid full page reload
  //   console.log("Submitting Patient Data:", formData); //validate action
  //   // TODO: Here you would send to API, validate, etc.
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.patientName.split(" ")[0], // extract first word as first name
          lastName: formData.patientName.split(" ").slice(1).join(" ") || "", // everything else as last name
          dob: formData.dateOfBirth,
        }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        // 1. Make sure the backend sent a user
        if (data.user) {
          const loggedInPatient: LoggedInPatient = {
            patientId: data.user.patient_id,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            dob: data.user.dob,
          };

          // 2. Save to localStorage so DashView can read it
          localStorage.setItem(
            "mymedcab_patient",
            JSON.stringify(loggedInPatient)
          );
        }

        alert("Login successful!");
        navigate("/dashboard/patient");
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col  h-screen justify-center px-12 py-20 lg:px-12 bg-green-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="mb-6">
            <img src={MedLogo} alt="MyMedCab Logo" className="mx-auto h-30" />
          </div>

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Patient Login Portal
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
              inputName="dateOfBirth"
              inputType="date"
              label="Date of Birth"
              inputValue={formData.dateOfBirth}
              onChange={handleChange("dateOfBirth")}
              required
            />

            <InputField
              inputName="patientName"
              inputType="text"
              label="Patient Name"
              placeholder="Enter your full name"
              inputValue={formData.patientName}
              onChange={handleChange("patientName")}
              required
            />

            <InputField
              inputName="patientID"
              inputType="text"
              label="Patient ID"
              placeholder="Enter your Patient ID"
              inputValue={formData.patientID}
              onChange={handleChange("patientID")}
              required
            />

            <p className="mt-2 text-sm text-red-400">
              {/* Error message for invalid input */}
            </p>

            <div
              className={`flex justify-center items-center ${sizes.gapMedium}`}
            >
              {/* submit button */}
              <ButtonComponent
                label="Login"
                onClick={() => {
                  console.log("Patient Login clicked");
                }}
                type="submit"
                size="medium"
                fullWidth={true}
                className="bg-green-700 hover:bg-green-500 text-white"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Are you a doctor?{" "}
            <button
              onClick={onSwitchToSpecialist}
              className="font-semibold text-container-200 hover:text-container-100"
            >
              Specialist Portal Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
