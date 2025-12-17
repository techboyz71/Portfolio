interface Props {
  label: string;
  onClick?: () => void;
}
function ButtonElement({ label, onClick }: Props) {
  return (
    <div>
      <button onClick={onClick} style={style.button}>
        {label}
      </button>
    </div>
  );
}

export default ButtonElement;

// Styles for the component or the views can go here
const style = {
  button: {
    padding: "15px",
    borderRadius: "25px",
    border: "none",
    width: "100%", // gets till end of frame
    boxSizing: "border-box" as "border-box",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#4CAF50",
    color: "white", // font color
    fontWeight: "bold" as "bold",
    cursor: "pointer", // cursor pointer on hover
    fontSize: "16px", // default font size
  },
};
