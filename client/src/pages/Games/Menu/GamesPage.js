import React from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "../../../utils/gameContext.js";
import { Link } from "react-router-dom";

import "./GamesPage.css";

function GamesMenu() {
  let gameOptions = [
    {
      title: "Bubble Trouble",
      description: "Click on a bubble to pop it.",
      component: <Canvas />,
    },
  ];

  const { toggleGameState } = useGameContext();

  return (
    <div className="menuCardsContainer">
      {gameOptions.map((game) => (
        <div className="gameViewContainer">
          {game.component}
          <div className="cardBody">
            <h5 className="card-title">{game.title}</h5>
            <p className="cardText">{game.description}</p>
            <Link className="playBtn" to="/gameplay">
              <a
                name={game.title}
                href="#"
                className="btn"
                onClick={() => {
                  toggleGameState(game.title);
                }}
              >
                Play
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GamesMenu;
