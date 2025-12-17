import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";

export type PrescriptionFormValues = {
  userId: string;
  medId: string;
  dosage: string;
  formula: string;
  timeline: string;
  period: string;
  prescriptionDate: string;
  lastRefill: string;
  nextRefill: string;
};

export interface PrescriptionBuilderProps {
  mode: "create" | "edit";
  initialValues: PrescriptionFormValues | null;
  onSaveEdit: (values: PrescriptionFormValues) => void | Promise<void>;
  onCancelEdit: () => void;
  // 🔹 parent (DashViewPhysician) uses this when mode === "create"
  onCreate?: (values: PrescriptionFormValues) => void | Promise<void>;
}

const emptyForm: PrescriptionFormValues = {
  userId: "",
  medId: "",
  dosage: "",
  formula: "",
  timeline: "",
  period: "",
  prescriptionDate: "",
  lastRefill: "",
  nextRefill: "",
};

function PrescriptionBuilder({
  mode,
  initialValues,
  onSaveEdit,
  onCancelEdit,
  onCreate,
}: PrescriptionBuilderProps) {
  const [form, setForm] = useState<PrescriptionFormValues>(emptyForm);

  // when edit mode + initialValues change, load them into the form
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm(initialValues);
    } else if (mode === "create") {
      setForm(emptyForm);
    }
  }, [mode, initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      if (onCreate) {
        await onCreate(form); // let parent talk to backend
      } else {
        console.log("CREATE prescription (no onCreate handler):", form);
        alert("Prescription created (frontend only, no backend handler).");
      }
      setForm(emptyForm);
    } else {
      // EDIT mode
      await onSaveEdit(form);
    }
  };

  const handleCancel = () => {
    if (mode === "edit") {
      onCancelEdit();
    } else {
      setForm(emptyForm);
    }
  };

  const isEdit = mode === "edit";

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto prescription-builder-form">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-9 justify-between"
      >
        <div className="flex flex-row gap-4">
          <InputField
            inputName="userId"
            inputType="text"
            label="User ID"
            placeholder="Enter patient ID"
            inputValue={form.userId}
            onChange={handleChange}
            required
            className="border border-accent-200"
          />

          <InputField
            inputName="medId"
            inputType="text"
            label="Medicine ID"
            placeholder="Enter medicine ID"
            inputValue={form.medId}
            onChange={handleChange}
            required
            className="border border-accent-200"
          />
        </div>
        <div className="flex flex-row gap-4">
          <InputField
            inputName="dosage"
            inputType="number"
            label="Dosage"
            placeholder="Enter dosage"
            inputValue={form.dosage}
            onChange={handleChange}
            required
            className="border border-accent-200"
          />

          <InputField
            inputName="formula"
            inputType="text"
            label="Formula"
            placeholder="e.g. tablet, capsule"
            inputValue={form.formula}
            onChange={handleChange}
            required
            className="border border-accent-200"
          />
        </div>
        <div className="flex flex-row gap-4">
          <InputField
            inputName="timeline"
            inputType="number"
            label="Timeline"
            placeholder="e.g. 1, 2"
            inputValue={form.timeline}
            onChange={handleChange}
            required
            className="border border-accent-200"
          />

          <InputField
            inputName="period"
            inputType="text"
            label="Period"
            placeholder="e.g. day, week"
            inputValue={form.period}
            onChange={handleChange}
            required
            className="border border-accent-200"
          />
        </div>

        <InputField
          inputName="prescriptionDate"
          inputType="date"
          label="Prescription Date"
          inputValue={form.prescriptionDate}
          onChange={handleChange}
          required
          className="border border-accent-200"
        />
        <div className="flex flex-row gap-4">
          <InputField
            inputName="lastRefill"
            inputType="date"
            label="Last Refill Date"
            inputValue={form.lastRefill}
            onChange={handleChange}
            className="border border-accent-200"
          />
          <InputField
            inputName="nextRefill"
            inputType="date"
            label="Next Refill Date"
            inputValue={form.nextRefill}
            onChange={handleChange}
            className="border border-accent-200"
          />
        </div>
        <div className="flex gap-3 bottom-0 w-full">
          <ButtonComponent
            label={isEdit ? "Save" : "Submit Prescription"}
            type="submit"
            size="medium"
            fullWidth
            className="button-component bg-container-500 hover:bg-container-400 text-white"
          />

          <ButtonComponent
            label={isEdit ? "Cancel" : "Clear"}
            type="button"
            size="medium"
            fullWidth
            onClick={handleCancel}
            className="button-tertiary bg-accent-500 hover:bg-accent-400 text-white"
          />
        </div>
      </form>
    </div>
  );
}

export default PrescriptionBuilder;
