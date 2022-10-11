import React, { useState } from "react";
import "./HomePage.css";

import Login from "../../components/Login/Login.js";
import CreateAccount from "../../components/CreateAccount/CreateAccount.js";
import FeaturedScores from "../../components/FeaturedScores/FeaturedScores.js";

import { useExistingUserContext } from "../../utils/existingUserContext";
import { loggedIn } from "../../utils/auth";

function HomePage() {
  const { existingUser, toggleExistingUser } = useExistingUserContext();

  return (
    <div className="homeViewContainer">
      {/* scoreboard component - currently just placeholder */}
      <FeaturedScores />
      {/* button with event listener that changes state variable */}
      {/* ternary operator conditionally renders <Login /> versus <CreateUser /> */}
      {existingUser ? <Login /> : <CreateAccount />}
    </div>
  );
}
export default HomePage;
