import MedicinePlaceholder from "../assets/images/medicinePlaceholder.png";

interface MedicineInfoProps {
  medicineName?: string;
  dosage?: string | number | null;
  formula?: string | null;
  timeline?: string | null;
  period?: string | null;
  prescriptionDate?: string | null;
}

function MedicineInfoSection({
  medicineName,
  dosage,
  formula,
  timeline,
  period,
  prescriptionDate,
}: MedicineInfoProps) {
  const hasSelection = !!medicineName;

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {hasSelection ? medicineName : "Select a medicine"}
      </h2>

      <div className="flex flex-row justify-center items-center mb-2">
        <img
          src={MedicinePlaceholder}
          alt="Medicine"
          className="w-32 h-32 object-cover mb-4 rounded-2xl"
        />
      </div>

      <div className="flex flex-row justify-between items-center mb-2">
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Dosage:</span>{" "}
          {hasSelection ? (dosage ?? "—") : "—"}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Formula:</span>{" "}
          {hasSelection ? (formula ?? "—") : "—"}
        </p>
      </div>

      <div className="flex flex-col justify-start items-start gap-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Timeline:</span>{" "}
          {hasSelection ? (timeline ?? "—") : "—"}
        </p>
        <p>
          <span className="font-semibold">Period:</span>{" "}
          {hasSelection ? (period ?? "—") : "—"}
        </p>
        <p>
          <span className="font-semibold">Prescription Date:</span>{" "}
          {hasSelection ? (prescriptionDate ?? "—") : "—"}
        </p>

        <p className="mt-2">
          Additional information can be added as needed to assist the user in
          understanding their medication. This section can include dosage
          instructions, side effects, interactions, and other relevant details.
        </p>
      </div>
    </div>
  );
}

export default MedicineInfoSection;
