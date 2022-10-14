import React, { useEffect, useCallback, useRef,useState } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext ,gameId } from "./../../../utils/gameContext";
import "./GamePlay.css";
import { useMutation, useQuery } from "@apollo/client";


import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";

function GamePlay() {
  const { gameState,gameId } = useGameContext();
  // changeTitle(gameState);
  let game;
  console.log("This game has id:",gameId);
  
  const [currentScore,changeScore] = useState(0);

  switch (gameState) {
    case "Bubble Trouble":
      game = <Canvas  />;
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
          Current Score: <span className="currentScore"> {currentScore}    </span>
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
