import "./Settings.css";

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
        <div className="screenTextChange">
          <h3>Change Screen Text Color</h3>
          {children}
          <select
            className="form-select"
            aria-label="Screen-text-color"
            defaultValue={"Fuscia"}
          >
            <option>Screen Text Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>opt</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="form-select"
            aria-label="Screen-text-color"
            defaultValue={"Fuscia"}
          >
            <option>Text Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>opt</option>
            ))}
          </select>
        </div>
        <select
          className="form-select"
          aria-label="Screen-text-color"
          defaultValue={"Fuscia"}
        >
          <option>Chat Text Color</option>
          {colorKeys.map((opt) => (
            <option key={opt}>opt</option>
          ))}
        </select>
        <select
          className="form-select"
          aria-label="Screen-text-color"
          defaultValue={"Fuscia"}
        >
          <option>Background Color</option>
          {colorKeys.map((opt) => (
            <option key={opt}>opt</option>
          ))}
        </select>
        <select
          className="form-select"
          aria-label="Screen-text-color"
          defaultValue={"Fuscia"}
        >
          <option>Chat Window Color</option>
          {colorKeys.map((opt) => (
            <option key={opt}>opt</option>
          ))}
        </select>
        <select
          className="form-select"
          aria-label="Screen-text-color"
          defaultValue={"Fuscia"}
        >
          <option>Header Color</option>
          {colorKeys.map((opt) => (
            <option key={opt}>opt</option>
          ))}
        </select>
        {/* <button
        type="button"
        onClick={handleClose}
        className="btn launch-button"
        data-bs-toggle="modal"
        data-bs-target="#launchModal"
      ></button> */}
      </div>
    </div>
  );
}
export default Settings;
