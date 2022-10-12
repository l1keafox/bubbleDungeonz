
import React, { useState,useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas.js";

function GamesPage({socket}) {
  return (
    <div className="gameViewContainer">
      {/* socket={} */}
      <Canvas socket={socket}/> 
      </div>
  );
}

export default GamesPage;
