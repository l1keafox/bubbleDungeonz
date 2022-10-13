import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaHamburger } from "react-icons/fa";
import auth from "../../utils/auth";
import Settings from "../Settings/Settings";

function Header() {
  //state variable to control whether the header has a Login or Logout link
  const [logInOrOut, setLogInOrOut] = useState("Login");
  const [showModal, changeModal] = useState(false);
  const toggleModal = () => {
    if (!showModal) {
      changeModal(true);
    } else {
      changeModal(false);
    }
    console.log("toggleModal", showModal);
  };
  //need logic to conditionally render Login/Logout link based on user objects loggedIn state

  return (
    <div className="headerDiv">
      <h1 className="headerTitle">Bubble DungeonZ</h1>
      <Settings show={showModal} />

      <ul className="navBar">
        <Link to={{ pathname: "/" }} className="navLink">
          <li>Home</li>
        </Link>
        <Link to={{ pathname: "/games" }} className="navLink">
          <li>Games</li>
        </Link>
        <li
          className={auth.loggedIn() ? "navLink" : "navLink hidden"}
          onClick={auth.logout}
        >
          Logout
        </li>
        <li className="navLink">
          <FaHamburger onClick={toggleModal}></FaHamburger>
        </li>
      </ul>
    </div>
  );
}

export default Header;
