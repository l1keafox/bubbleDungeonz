import React, { useState, createContext, useContext } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export default function GameContextProvider(props) {
  const [gameState, setGameState] = useState();
  const [gameId, setGameId] = useState();

  // name should be a string value equal to game title
  const submitGameTitle = (gameTitle) => {
    return setGameState(gameTitle);
  };
  const submitGameId = (gameId) => {
    return setGameId(gameId);
  };

  return (
    <GameContext.Provider value={{ gameState, submitGameTitle, gameId, submitGameId }}>
      {props.children}
    </GameContext.Provider>
  );
}
