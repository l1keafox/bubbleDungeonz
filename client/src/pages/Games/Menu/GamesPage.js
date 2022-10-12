import React, { useState, useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";

function GamesMenu() {
  let gameOptions = [
    {
      title: "Bubble Trouble",
      description: "Click on a bubble to pop it.",
      component: <Canvas />,
    },
  ];

  return (
    <div className="gameViewContainer">
      {gameOptions.map((game) => (
        <div className="gameViewContainer">
          <div style={{ width: "18rem" }}>
            {game.component}
            <div className="card-body">
              <h5 className="card-title">{game.title}</h5>
              <p className="card-text">{game.description}</p>
              <a href="#" className="btn btn-primary">
                Play
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GamesMenu;
