import "./Settings.css";
// import "./colors.css";
import Header from "../Header/Header";
function Settings({ handleClose, show, children }) {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  console.log(show, showHideClassName);
  const colorKeys = [
    "Fuscia",
    "Red",
    "Orange",
    "Tangerine",
    "Carrot",
    "Yellow",
    "Lime",
    "Green",
    "Dark Green",
    "Sea Foam Green",
    "Turquoise",
    "Teal",
    "Aegean Blue",
    "Sky Blue",
    "Navy",
    "Purple",
    "White",
    "Black",
  ];

  return (
    <div className={showHideClassName} id="mainModal">
      <div className="modal-main">
        {children}
        <button
          type="button"
          onClick={handleClose}
          className="btn launch-button"
          data-bs-toggle="modal"
          data-bs-target="#launchModal"
        ></button>
        <select
          className="form-select"
          aria-label="Screen-text-color"
          defaultValue={"Fuscia"}
        >
          <option>Screen Text Color</option>
          {colorKeys.map((colorKeys) => (
            <option key={colorKeys}>opt</option>
          ))}
        </select>
        <select
          className="form-select"
          aria-label="Screen-text-color"
          defaultValue={"Fuscia"}
        >
          <option>Text Color</option>
          {colorKeys.map((colorKeys) => (
            <option key={colorKeys}>opt</option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default Settings;
