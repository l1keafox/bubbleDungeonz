import React, { useState,useEffect } from "react";
// import "./HomePage.css";

import Canvas from "../../components/Canvas/Canvas.js";

// import { loggedIn } from "../../utils/auth";
function HomePage({socket}) {
  useEffect(() => {
    socket.on('bubbles', (obj) => {
      console.log(obj);
    });
  }, [socket]);
  return (
    <div className="gameViewContainer">
      {/* scoreboard component - currently just placeholder */}
      {/* button with event listener that changes state variable */}
      {/* ternary operator conditionally renders <Login /> versus <CreateUser /> */}
      {/* socket={} */}
      <Canvas /> 
      </div>
  );
}
export default HomePage;
