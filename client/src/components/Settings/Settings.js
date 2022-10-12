import "./Settings.css";
import "./colors.css";

function Settings() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="settings">
              Settings
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <select class="form-select" aria-label="Screen-text-color">
              <option selected>Screen Text Color</option>
              <option value="1">Fuscia</option>
              <option value="2">Red</option>
              <option value="3">Orange</option>
              <option value="4">Tangerine</option>
              <option value="5">Carrot</option>
              <option value="6">Yellow</option>
              <option value="7">Lime</option>
              <option value="8">Green</option>
              <option value="9">Dark Green</option>
              <option value="10">Sea Foam Green</option>
              <option value="11">Turquoise</option>
              <option value="12">Teal</option>
              <option value="13">Aegean Blue</option>
              <option value="14">Sky Blue</option>
              <option value="15">Navy</option>
              <option value="16">Purple</option>
              <option value="17">White</option>
              <option value="18">Black</option>
            </select>
            <select class="form-select" aria-label="Text-color">
              <option selected>Text Color</option>
              <option value="1">Fuscia</option>
              <option value="2">Red</option>
              <option value="3">Orange</option>
              <option value="4">Tangerine</option>
              <option value="5">Carrot</option>
              <option value="6">Yellow</option>
              <option value="7">Lime</option>
              <option value="8">Green</option>
              <option value="9">Dark Green</option>
              <option value="10">Sea Foam Green</option>
              <option value="11">Turquoise</option>
              <option value="12">Teal</option>
              <option value="13">Aegean Blue</option>
              <option value="14">Sky Blue</option>
              <option value="15">Navy</option>
              <option value="16">Purple</option>
              <option value="17">White</option>
              <option value="18">Black</option>
            </select>
            <select class="form-select" aria-label="Chat-text-color">
              <option selected>Chat Text Color</option>
              <option value="1">Fuscia</option>
              <option value="2">Red</option>
              <option value="3">Orange</option>
              <option value="4">Tangerine</option>
              <option value="5">Carrot</option>
              <option value="6">Yellow</option>
              <option value="7">Lime</option>
              <option value="8">Green</option>
              <option value="9">Dark Green</option>
              <option value="10">Sea Foam Green</option>
              <option value="11">Turquoise</option>
              <option value="12">Teal</option>
              <option value="13">Aegean Blue</option>
              <option value="14">Sky Blue</option>
              <option value="15">Navy</option>
              <option value="16">Purple</option>
              <option value="17">White</option>
              <option value="18">Black</option>
            </select>
            <select class="form-select" aria-label="Background-color">
              <option selected>Background Color</option>
              <option value="1">Fuscia</option>
              <option value="2">Red</option>
              <option value="3">Orange</option>
              <option value="4">Tangerine</option>
              <option value="5">Carrot</option>
              <option value="6">Yellow</option>
              <option value="7">Lime</option>
              <option value="8">Green</option>
              <option value="9">Dark Green</option>
              <option value="10">Sea Foam Green</option>
              <option value="11">Turquoise</option>
              <option value="12">Teal</option>
              <option value="13">Aegean Blue</option>
              <option value="14">Sky Blue</option>
              <option value="15">Navy</option>
              <option value="16">Purple</option>
              <option value="17">White</option>
              <option value="18">Black</option>
            </select>
            <select class="form-select" aria-label="Chat-window-color">
              <option selected>Chat Window Color</option>
              <option value="1">Fuscia</option>
              <option value="2">Red</option>
              <option value="3">Orange</option>
              <option value="4">Tangerine</option>
              <option value="5">Carrot</option>
              <option value="6">Yellow</option>
              <option value="7">Lime</option>
              <option value="8">Green</option>
              <option value="9">Dark Green</option>
              <option value="10">Sea Foam Green</option>
              <option value="11">Turquoise</option>
              <option value="12">Teal</option>
              <option value="13">Aegean Blue</option>
              <option value="14">Sky Blue</option>
              <option value="15">Navy</option>
              <option value="16">Purple</option>
              <option value="17">White</option>
              <option value="18">Black</option>
            </select>
            <select class="form-select" aria-label="Header-color">
              <option selected>Header Color</option>
              <option value="1">Fuscia</option>
              <option value="2">Red</option>
              <option value="3">Orange</option>
              <option value="4">Tangerine</option>
              <option value="5">Carrot</option>
              <option value="6">Yellow</option>
              <option value="7">Lime</option>
              <option value="8">Green</option>
              <option value="9">Dark Green</option>
              <option value="10">Sea Foam Green</option>
              <option value="11">Turquoise</option>
              <option value="12">Teal</option>
              <option value="13">Aegean Blue</option>
              <option value="14">Sky Blue</option>
              <option value="15">Navy</option>
              <option value="16">Purple</option>
              <option value="17">White</option>
              <option value="18">Black</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFormSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
