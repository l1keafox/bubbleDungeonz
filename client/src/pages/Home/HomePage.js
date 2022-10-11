import React, { useState } from "react";
import "./HomePage.css";

import Login from "../../components/Login/Login.js";
import FeaturedScores from "../../components/FeaturedScores/FeaturedScores.js";

import { loggedIn } from "../../utils/auth";

function HomePage() {
  return (
    <div className="homeViewContainer">
      {/* scoreboard component */}
      <FeaturedScores />
      {/* conditionally render login versus create user component */}
      <Login />
    </div>
  );
}
export default HomePage;
