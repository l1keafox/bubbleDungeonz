import { useState } from "react";
import "./CreateAccount.css";
import React, { useState } from "react";

function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [reTypePassWord, setReTypePassword] = useState("")
  const [email, setEmail] = useState("");
  const errorMessage = 

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value

    if (inputType === 'userName') {
      setUserName(inputValue)
    } else if (inputType === 'passWord') {
      setPassWord(inputValue)
    } else if (inputType === 'reTypePassWord') {
      setReTypePassword(inputValue)
    } else if (inputType === 'email') {
      setEmail(inputValue)
    }
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
          className="form-control"
          placeholder="Username"
          aria-label="Username"
        ></input>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Password:
        </span>
        <input
          name="passWord"
          type="text"
          class="form-control"
          placeholder="Password"
          aria-label="Password"
        ></input>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Re-Type Password:
        </span>
        <input
          name="reTypePassWord"
          type="text"
          class="form-control"
          placeholder="Re-Type Password"
          aria-label="Re-Type Password"
        ></input>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Email:
        </span>
        <input
          name="email"
          type="text"
          class="form-control"
          placeholder="Email"
          aria-label="Email"
        ></input>
      </div>
      <div></div>
    </div>
  );
}
