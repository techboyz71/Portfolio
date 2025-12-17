import React from "react";
import InputField from "./InputField";
import ButtonElement from "./ButtonElement";

function SubmitionForm() {
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [userDOB, setUserDOB] = React.useState("");
  // let [weight, setWeight] = React.useState("");
  // let [bloodPressure, setBloodPressure] = React.useState("");
  // let [sugarLevel, setSugarLevel] = React.useState("");

  return (
    <div style={style.container as React.CSSProperties}>
      {/* Title */}
      <h1 style={style.heading as React.CSSProperties}>MyMedCab</h1>
      {/* Subtitle */}
      <h2 style={style.subHeading as React.CSSProperties}>
        Patient Search Form
      </h2>
      {/* General Patient Information
      <h3 style={style.secondSubHeading as React.CSSProperties}>
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
      <h3 style={style.secondSubHeading as React.CSSProperties}>
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
        onChange={(e) => setSugarLevel(e.target.value)} */}{" "}
      <br />
      <ButtonElement label="Submit" onClick={() => {}} />
    </div>
  );
}

export default SubmitionForm;

const style = {
  heading: {
    textAlign: "center" as "center",
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subHeading: {
    textAlign: "center" as "center",
    fontSize: "20px",
    marginBottom: "20px",
    color: "#555",
  },
  secondSubHeading: {
    textAlign: "left" as "left",
    fontSize: "16px",
    marginBottom: "10px",
    color: "#777",
  },
  container: {
    backgroundColor: "white",
    borderColor: "#ddd",
    width: "600px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "20px",
    boxShadow: "0 4px 6px rgba(85, 0, 0, 0.56)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
  },
};
