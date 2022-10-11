import React, { useState } from "react";
import "./Header.css";
import { FaHamburger } from "react-icons/fa";

function Header() {
  //state variable to control whether the header has a Login or Logout link
  const [logInOrOut, setLogInOrOut] = useState("Login");

  return (
    <div className="headerDiv">
      <h1>App Title</h1>
      <ul className="navBar">
        <li className="navLink">Home</li>
        <li className="navLink">Games</li>
        <li className="navLink">{logInOrOut}</li>
        <li className="navLink">
          <FaHamburger></FaHamburger>
        </li>
      </ul>
    </div>
  );
}

export default Header;
