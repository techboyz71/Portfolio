/**
 * A reusable button component with customizable size, label, and click handler.
 *
 * @param {Object} props - The properties for the ButtonComponent.
 * @param {() => void} [props.onClick] - Optional click event handler for the button.
 * @param {string} [props.label] - Optional label text to display on the button. Defaults to "Click me".
 * @param {"small" | "medium" | "large"} [props.size] - Optional size of the button.
 *        Determines the padding applied to the button.
 *        Accepts "small", "medium", or "large".
 * @param {string} [props.type] - Button type (button, submit, reset). Defaults to "button".
 * @param {boolean} [props.fullWidth] - Whether button should take full width. Defaults to false.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 *        Use this for button variants like "button-secondary", "button-tertiary", etc.
 */

// Define the props for the ButtonComponent
interface ButtonComponentProps {
  onClick?: () => void;
  label?: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
}

const ButtonComponent = ({
  onClick,
  label = "Click me",
  size = "medium",
  type = "button",
  fullWidth = false,
  className = "",
}: ButtonComponentProps) => {
  // Generate CSS classes based on props
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "button-small";
      case "medium":
        return "button-medium";
      case "large":
        return "button-large";
      default:
        return "button-medium";
    }
  };

  const getWidthClass = () => {
    return fullWidth ? "button-full-width" : "button-auto-width";
  };

  // Combine all classes: base + size + width + custom
  const buttonClasses =
    `button-component ${getSizeClass()} ${getWidthClass()} ${className}`.trim();

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {label}
    </button>
  );
};

export default ButtonComponent;
