import React from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "../../../utils/gameContext.js";
import { Link } from "react-router-dom";

import "./GamesPage.css";

function GamesMenu() {
  let gameOptions = [
    {
      title: "Bubble Trouble",
      description: "How many bubbles can you pop before the time is up?",
      component: <Canvas />,
    },
    {
      title: "Double Trouble",
      description: "Bubbles AGAIN!?!?",
      component: <Canvas />,
    },
  ];

  const { toggleGameState } = useGameContext();

  return (
    <div className="menuCardsContainer">
      {gameOptions.map((game) => (
        <div className="gameViewContainer">
          <div className="gameComponent">{game.component}</div>
          <div className="cardBody">
            <h5 className="cardTitle">{game.title}</h5>
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
