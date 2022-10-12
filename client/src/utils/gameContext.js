import React, { useState, createContext, useContext } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export default function GameContextProvider(props) {
  const [gameState, setGameState] = useState(null);

  // name should be a string value equal to game title
  const toggleGameState = (gameTitle) => {
    return setGameState(gameTitle);
  };

  return (
    <GameContext.Provider value={{ gameState, toggleGameState }}>
      {props.children}
    </GameContext.Provider>
  );
}
