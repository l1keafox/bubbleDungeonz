import "./Settings.css";

import auth from "./../../utils/auth";
function Settings({ handleClose, show, children }) {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
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
      <h1>Settings</h1>
      <div className="modal-main">
        <div className="settingsOptions">
          <h3>Change Screen Text Color</h3>
          <select
            className="form-select"
            aria-label="screen-text-color"
            defaultValue={"Fuscia"}
          >
            <option>Screen Text Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="settingsOptions">
          <h3>Link Text Color</h3>
          <select
            className="form-select"
            aria-label="link-text-color"
            defaultValue={"Fuscia"}
          >
            <option>Link Text Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="settingsOptions">
          <h3>Change Chat Text Color</h3>
          <select
            className="form-select"
            aria-label="chat-text-color"
            defaultValue={"Fuscia"}
          >
            <option>Chat Text Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="settingsOptions">
          <h3>Change Background Color</h3>
          <select
            className="form-select"
            aria-label="background-color"
            defaultValue={"Fuscia"}
          >
            <option>Background Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="settingsOptions">
          <h3>Change Chat Window Color</h3>
          <select
            className="form-select"
            aria-label="chat-window-color"
            defaultValue={"Fuscia"}
          >
            <option>Chat Window Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="settingsOptions">
          <h3>Change Header Color</h3>
          <select
            className="form-select"
            aria-label="header-color"
            defaultValue={"Fuscia"}
          >
            <option>Header Color</option>
            {colorKeys.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleFormSubmit}
          className="save-button"
          data-bs-toggle="modal"
          data-bs-target="#launchModal"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default Settings;
