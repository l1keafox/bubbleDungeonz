import "./CreateAccount.css";
import React, { useState } from "react";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { BsJoystick } from "react-icons/bs";
import { IoMdRocket } from "react-icons/io";

function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [reTypePassWord, setReTypePassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { toggleExistingUser } = useExistingUserContext();

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
      <h4 className="createUserCardTitle">Create Account</h4>

      <div className="formContainer">
        <div className="inputGroup">
          <span className="inputGroupText">Username:</span>
          <input
            name="userName"
            type="text"
            value={userName}
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="Username"
            aria-label="Username"
          ></input>
        </div>
        <div className="inputGroup">
          <span className="inputGroupText">Password:</span>
          <input
            name="passWord"
            type="password"
            value={passWord}
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="********"
            aria-label="Password"
          ></input>
        </div>
        <div className="inputGroup">
          <span className="inputGroupText">Retype Password:</span>
          <input
            name="reTypePassWord"
            type="password"
            value={reTypePassWord}
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="********"
            aria-label="ReType Password"
          ></input>
        </div>
        <div className="inputGroup">
          <span className="inputGroupText">Email:</span>
          <input
            name="email"
            value={email}
            type="text"
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="Email"
            aria-label="Email"
          ></input>
        </div>
        <button
          className="submitButton"
          type="button"
          onClick={handleFormSubmit}
        >
          Create Account <BsJoystick></BsJoystick>
        </button>
        <hr
          style={{
            height: "1px",
            width: "95%",
            borderWidth: "0",
            color: "black",
            backgroundColor: "black",
          }}
        />
        <button className="loginSubmitBtn" onClick={toggleExistingUser}>
          Return to Login <IoMdRocket />
        </button>
      </div>

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
