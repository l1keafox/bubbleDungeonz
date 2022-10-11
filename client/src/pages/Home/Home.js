import React, { useState } from "react";

import Login from "../../components/Login/Login.js";
import FeaturedScores from "../../components/FeaturedScores/FeaturedScores.js";
import { loggedIn } from "../../utils/auth";

function HomeView() {
  return (
    <div className="homeViewContainer">
      {/* scoreboard component */}
      <FeaturedScores />
      {/* conditionally render login versus create user component */}
      <Login />
    </div>
  );
}
