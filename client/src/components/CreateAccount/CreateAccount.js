import "./CreateAccount.css";
import React, { useState } from "react";

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
      setErrorMessage("Passwords do not match.. Try Again!");
    }
    if (!userName) {
      setErrorMessage("Username can not be blank.");
    }
    setUserName("");
    setPassWord("");
    setEmail("");
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
          type="text"
          value={passWord}
          className="form-control"
          onChange={handleInputChange}
          placeholder="Password"
          aria-label="Password"
        ></input>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Re-Type Password:
        </span>
        <input
          name="reTypePassWord"
          type="text"
          value={reTypePassWord}
          className="form-control"
          onChange={handleInputChange}
          placeholder="Re-Type Password"
          aria-label="Re-Type Password"
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
        <button type="button" onClick={handleFormSubmit}></button>
      </div>
      <div></div>
    </div>
  );
}

export default CreateAccount;
