import React from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "./../../../utils/gameContext";
import { Link } from "react-router-dom";

// import { useGame}  from "../../../utils/gameContext";
function GamePlay() {
  const { gameState } = useGameContext();
  console.log(gameState);
  let game;
  switch (gameState) {
    case "Bubble Trouble":
      game = <Canvas />;
      break;
      deafult:
      game = <Canvas />;
      break;
  }
  return (
    <div>
      <h1>{gameState}</h1>
      {game}
    </div>
  );
}

export default GamePlay;
