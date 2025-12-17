import React from "react";

/**
 * @prop {string} inputName - Name attribute for the input field.
 * @prop {string | number} inputValue - Value of the input field.
 * @prop {string} inputType - Type of the input field (e.g., "text", "password", "email").
 * @prop {string} placeholder - Placeholder text for the input field.
 * @prop {string} label - Label text for the input field.
 * @prop {boolean} showForgotPassword - Whether to show the "forgot password" link.
 * @prop {string} forgotPasswordText - Custom text for the forgot password link.
 * @prop {() => void} onForgotPassword - Handler for forgot password link click.
 * @prop {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Change event handler for the input field.
 * @prop {boolean} required - Whether the field is required.
 */

interface Props {
  // Properties
  inputName?: string;
  inputValue?: string | number;
  inputType?: string; // e.g "text", "password", "email", "number", "tel", etc.
  placeholder?: string;
  label?: string;
  showForgotPassword?: boolean;
  forgotPasswordText?: string;
  onForgotPassword?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

function InputField(inputProps: Props) {
  const {
    inputName,
    inputValue,
    inputType = "text",
    placeholder,
    label,
    showForgotPassword = false,
    forgotPasswordText = "Forgot password?",
    onForgotPassword,
    onChange,
    required = false,
  } = inputProps;

  // Generate ID from name or label
  const fieldId =
    inputName || label?.toLowerCase().replace(/\s+/g, "-") || "input-field";

  // Get appropriate autoComplete value based on input type
  const getAutoComplete = (type: string) => {
    switch (type) {
      case "email":
        return "email";
      case "password":
        return "current-password";
      case "tel":
        return "tel";
      case "text":
        return inputName === "firstName"
          ? "given-name"
          : inputName === "lastName"
          ? "family-name"
          : "off";
      default:
        return "off";
    }
  };

  return (
    <div className={`input-field-container`}>
      <div className="input-field-header">
        {label && (
          <label htmlFor={fieldId} className="input-field-label">
            {label}
          </label>
        )}
        {showForgotPassword && (
          <div className="forgot-password-container">
            <button
              type="button"
              onClick={onForgotPassword}
              className="forgot-password-link"
            >
              {forgotPasswordText}
            </button>
          </div>
        )}
      </div>
      <div
        className={
          label ? "input-wrapper input-wrapper--with-label" : "input-wrapper"
        }
      >
        <input
          id={fieldId}
          name={inputName || fieldId}
          type={inputType}
          value={inputValue ?? ""}
          required={required}
          autoComplete={getAutoComplete(inputType)}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${inputProps.className || ""}`}
        />
      </div>
    </div>
  );
}

export default InputField;
