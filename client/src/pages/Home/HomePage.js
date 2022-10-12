import React, { useState } from "react";
import "./HomePage.css";

import Login from "../../components/Login/Login.js";
import CreateAccount from "../../components/CreateAccount/CreateAccount.js";
import FeaturedScores from "../../components/FeaturedScores/FeaturedScores.js";
import ChatList from "../../components/ChatList/ChatList.js";

import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";

function HomePage() {
  const { existingUser } = useExistingUserContext();
  return (
    <div className="homeViewContainer">
      {/* scoreboard component - currently just placeholder */}
      <FeaturedScores />
      {/* conditionally renders <Login /> versus <CreateUser /> based on global context variable */}
      {auth.loggedIn() ? <div /> : existingUser ? <Login /> : <CreateAccount />}
      {auth.loggedIn() ? <ChatList />:<div/> }
    </div>
  );
}
export default HomePage;
