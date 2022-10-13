import React from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "./../../../utils/gameContext";
import "./GamePlay.css";

import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";

function GamePlay() {
  const { gameState } = useGameContext();
  // changeTitle(gameState);
  let game;
  switch (gameState) {
    case "Bubble Trouble":
      game = <Canvas />;
      break;
    default:
      game = <Canvas />;
      break;
  }
  return (
    <div className="gamePlayContainer">
      <div className="canvasContainer">
        <h1 className="gamePlayTitle">{gameState}</h1>
        {game}
        <p className="scoreCounter">
          Current Score: <span className="currentScore"></span>
        </p>
      </div>
      <div className="highScoreContainer">
        <div className="featuredScoresDiv">
          <div className="cardBody">
            <h5 className="featuredGame card-title">{gameState} High Scores</h5>
          </div>
          <div className="featuredScoresList">
            <div className="featuredScore">
              <span className="featuredUsername">username</span> - score
            </div>
            <div className="featuredScore">
              <span className="featuredUsername">username</span> - score
            </div>
            <div className="featuredScore">
              <span className="featuredUsername">username</span> - score
            </div>
            <div className="featuredScore">
              <span className="featuredUsername">username</span> - score
            </div>
            <div className="featuredScore">
              <span className="featuredUsername">username</span> - score
            </div>
          </div>
        </div>
      </div>
      {auth.loggedIn() ? <ChatList /> : <div />}
    </div>
  );
}

export default GamePlay;
