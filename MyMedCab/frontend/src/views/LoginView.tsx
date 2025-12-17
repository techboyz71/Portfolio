import { useState } from "react";
import PatientForm from "../components/PatientForm";
import SpecialistForm from "../components/SpecialistForm";
import bgGreen from "../assets/images/BackgroundImageBlue.png";
import bgBlue from "../assets/images/BackgroundImageGreen.png";

function LoginView() {
  const [currentForm, setCurrentForm] = useState<"patient" | "specialist">(
    "patient"
  );

  const showPatientForm = () => setCurrentForm("patient");
  const showSpecialistForm = () => setCurrentForm("specialist");
  return (
    <div className="flex items-center justify-start h-screen w-screen">
      <div className="w-1/4">
        {currentForm === "patient" && (
          <PatientForm onSwitchToSpecialist={showSpecialistForm} />
        )}
        {currentForm === "specialist" && (
          <SpecialistForm onSwitchToPatient={showPatientForm} />
        )}
      </div>
      <div className="w-3/4">
        {currentForm === "patient" && (
          <img
            src={bgBlue}
            alt="MyMedCab Logo"
            className="mx-auto h-screen w-full object-cover"
          />
        )}
        {currentForm === "specialist" && (
          <img
            src={bgGreen}
            alt="MyMedCab Logo"
            className="mx-auto h-screen w-full object-cover"
          />
        )}
      </div>{" "}
      {/* Future: Add a welcome panel or image here */}
    </div>
  );
}

export default LoginView;
