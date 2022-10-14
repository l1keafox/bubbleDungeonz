import React, { useEffect, useCallback, useRef,useState } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "./../../../utils/gameContext";
import "./GamePlay.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GAME_CARDS } from "../../../utils/queries";
import FeaturedScores from "../../../components/FeaturedScores/FeaturedScores";

import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";

function GamePlay() {
  const { gameState } = useGameContext();
  const { loading, error, data } = useQuery(GET_GAME_CARDS); //async not functioning
  const [scores, setScore] = useState([]);
  useEffect(() => {
    if (data && data.gameCards) {
      const gameCards = data.gameCards;
      // console.log(data.gameCards);

      // Pick a game at random from the list
      let randomGameIndex = Math.floor(Math.random() * gameCards.length);
      // let featuredGame = gameCards[randomGameIndex];
      let featuredGame = gameCards[0]; //until the system has more than one game
      let out = [...featuredGame.scores].sort((a, b) => a.score*-1 - b.score*-1);
      //
      setScore([...out] );
    }
  }, [data]);

  let game;

  switch (gameState) {
    case "Bubble Trouble":
      game = <Canvas />;
      break;
    default:
      game = <Canvas />;
      break;
  }

  try {

    return (
      <div className="gamePlayContainer">
        <div className="canvasContainer">
          <h1 className="gamePlayTitle">{gameState}</h1>
          {game}
          <p className="scoreCounter">
            Current Score: <span className="currentScore"></span>
          </p>
        </div>
        <FeaturedScores scores = {scores}/>

        {auth.loggedIn() ? <ChatList /> : <div />}
      </div>
    );
  } catch (err) {
    if (err) console.log(err);
  }
}

export default GamePlay;
