import "./CreateAccount.css";
import React, { useState } from "react";
import { BsJoystick } from "react-icons/bs";
function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [reTypePassWord, setReTypePassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "userName") {
      setUserName(inputValue);
    } else if (inputType === "passWord") {
      setPassWord(inputValue);
    } else if (inputType === "reTypePassWord") {
      setReTypePassword(inputValue);
    } else if (inputType === "email") {
      setEmail(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (passWord !== reTypePassWord) {
      setErrorMessage("Womp Womp passwords do not match.. Try Again!");
    }
    if (!userName) {
      setErrorMessage("Username can not be blank.");
    }
    setUserName("");
    setPassWord("");
    setEmail("");
    setReTypePassword("");
  };

  return (
    <div className="createUserForm">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Username:
        </span>
        <input
          name="userName"
          type="text"
          value={userName}
          className="form-control"
          onChange={handleInputChange}
          placeholder="Username"
          aria-label="Username"
        ></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Password:
        </span>
        <input
          name="passWord"
          type="password"
          value={passWord}
          className="form-control"
          onChange={handleInputChange}
          placeholder="Password"
          aria-label="Password"
        ></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Retype Password:
        </span>
        <input
          name="reTypePassWord"
          type="password"
          value={reTypePassWord}
          className="form-control"
          onChange={handleInputChange}
          placeholder="ReType Password"
          aria-label="ReType Password"
        ></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Email:
        </span>
        <input
          name="email"
          value={email}
          type="text"
          className="form-control"
          onChange={handleInputChange}
          placeholder="Email"
          aria-label="Email"
        ></input>
      </div>
      <button className="submitButton" type="button" onClick={handleFormSubmit}>
        Start! <BsJoystick></BsJoystick>
      </button>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default CreateAccount;
