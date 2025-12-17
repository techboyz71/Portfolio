import React from "react";
import InputField from "./InputField";
import ButtonElement from "./ButtonComponent";

function UserSubmitionForm() {
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [userDOB, setUserDOB] = React.useState("");

  // let [weight, setWeight] = React.useState("");
  // let [bloodPressure, setBloodPressure] = React.useState("");
  // let [sugarLevel, setSugarLevel] = React.useState("");

  return (
    <div>
      {/* Title */}
      <h1>MyMedCab</h1>
      {/* Subtitle */}
      <h2>Patient Search Form</h2>
      {/* General Patient Information
      <h3>
        General Patient Information
      </h3> */}
      <InputField
        placeholder="First Name"
        inputValue={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <InputField
        placeholder="Last Name"
        inputValue={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <InputField
        placeholder="Date of Birth"
        inputValue={userDOB}
        onChange={(e) => setUserDOB(e.target.value)}
      />
      {/* Medical Information
      <h3>
        Medical Information
      </h3>
      <InputField
        placeholder="Weight"
        inputValue={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <InputField
        placeholder="Blood Pressure"
        inputValue={bloodPressure}
        onChange={(e) => setBloodPressure(e.target.value)}
      />
      <InputField
        placeholder="Sugar Level"
        inputValue={sugarLevel}
        onChange={(e) => setSugarLevel(e.target.value)} */}
      <br />

      {/* Error Message Example, depending of the output of the form validation or server response */}
      <p>Error Field</p>

      {/* Submit Button */}
      <ButtonElement label="Submit" onClick={() => {}} />
    </div>
  );
}

export default UserSubmitionForm;
