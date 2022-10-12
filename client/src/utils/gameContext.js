import React, { useState, createContext, useContext } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(gameContext);

export default function GameContextProvider() {
  const [gameState, setGameState] = useState(null);

  // name should be a string value equal to game title
  const toggleGameState = (name) => {
    return setGameState(name);
  };

  return (
    <GameContext.Provider value={{ gameState, toggleGameState }}>
      {props.children}
    </GameContext.Provider>
  );
}
