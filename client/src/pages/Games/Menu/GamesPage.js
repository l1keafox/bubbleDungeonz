import React from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "../../../utils/gameContext.js";
import { Link } from "react-router-dom";

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
    <div className="gameViewContainer">
      {gameOptions.map((game) => (
        <div className="gameViewContainer">
          <div style={{ width: "18rem" }}>
            {game.component}
            <div className="card-body">
              <h5 className="card-title">{game.title}</h5>
              <p className="card-text">{game.description}</p>
              <Link to="/gameplay">
                <a
                  name={game.title}
                  href="#"
                  className="btn btn-primary"
                  onClick={() => {
                    toggleGameState(game.title);
                  }}
                >
                  Play
                </a>
              </Link>
              ;
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GamesMenu;
