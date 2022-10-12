import React, { useState } from "react";
import "./HomePage.css";

import Login from "../../components/Login/Login.js";
import FeaturedScores from "../../components/FeaturedScores/FeaturedScores.js";

// import { loggedIn } from "../../utils/auth";
function HomePage() {
  return (
    <div className="homeViewContainer">
      {/* scoreboard component - currently just placeholder */}
      <FeaturedScores />
      {/* button with event listener that changes state variable */}
      {/* ternary operator conditionally renders <Login /> versus <CreateUser /> */}
      <Login />
      </div>
  );
}
export default HomePage;
