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
    <>
      <div className="canvasContainer">
        <h1>{gameState}</h1>
        {game}
      </div>
      {auth.loggedIn() ? <ChatList /> : <div />}
    </>
  );
}

export default GamePlay;
