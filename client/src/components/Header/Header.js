import React, { useState } from "react";
// import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaHamburger } from "react-icons/fa";
import auth from "../../utils/auth";
import Settings from "../Settings/Settings";
import { useGameContext } from "../../utils/gameContext";
import { useExistingUserContext } from "../../utils/existingUserContext";

function Header() {
  const { loggedIn, setLogin } = useExistingUserContext();
  // const {data} = useQuery(GET_ME);
  //  const [userContext, setUserContext] = useState(useExistingUserContext());
  // const me = data?._id || [];

  //state variable to control whether the header has a Login or Logout link
  //  const [logInOrOut, setLogInOrOut] = useState("Login");
  const [showModal, changeModal] = useState(false);
  const { toggleGameState } = useGameContext();
  const toggleModal = () => {
    if (!showModal) {
      changeModal(true);
    } else {
      changeModal(false);
    }
  };
  //need logic to conditionally render Login/Logout link based on user objects loggedIn state

  function conditionalLogin(){
    if(loggedIn || auth.loggedIn()){
      return(<li
        className="navLink"
        onClick={() => {
          auth.logout();
          setLogin(false);
          toggleGameState(null);
        }}
      >
        Logout
      </li>);
    }else{
      return(<Link
        onClick={() => toggleGameState(null)}
        to={{ pathname: "/" }}
        className="navLink"
      >
        <li>Login</li>
      </Link>)
    }
    
  }
  function conditionalSettings(){
    if(loggedIn || auth.loggedIn()){
      return ( 
        <li className="navLink">
          <FaHamburger onClick={toggleModal}></FaHamburger>
        </li>
      )
    }else{
      return (<div></div>)
    }
  }

  return (
    <div className="headerDiv">
      <h1 className="headerTitle">Bubble DungeonZ</h1>
      <Settings show={showModal} />

      <ul className="navBar">
        <Link
          onClick={() => toggleGameState(null)}
          to={{ pathname: "/" }}
          className="navLink"
        >
          <li>Home</li>
        </Link>
        <Link
          onClick={() => toggleGameState(null)}
          to={{ pathname: "/games" }}
          className="navLink"
        >
          <li>Games</li>
        </Link>
        {conditionalLogin()}
        {conditionalSettings()}
      </ul>
    </div>
  );
}

export default Header;
