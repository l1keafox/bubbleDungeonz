import React, { useEffect, useCallback, useRef } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "./../../../utils/gameContext";
import "./GamePlay.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GAME_CARDS } from "../../../utils/queries";

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

  // pulling game card data for game scores
  const { loading, error, data } = useQuery(GET_GAME_CARDS);

  try {
    const gameCards = data?.gameCards || [];
    const currentGameCard = gameCards.filter(
      (card) => card.title === gameState
    );

    const allScoresArray = currentGameCard[0].scores
      .map((score) => ({
        score: score.score,
        username: score.user.username,
      }))
      .sort((a, b) => a - b);

    let highScoresArray = [];
    for (
      var i = allScoresArray.length - 1;
      i > allScoresArray.length - 6;
      i--
    ) {
      highScoresArray.push(allScoresArray[i]);
    }

    function populateHighScores() {
      if (loading) {
        return <p>loading</p>;
      } else {
        // list items of username - score
        // map over highScoresArray
        return highScoresArray.map((score) => (
          <div className="featuredScore">
            <span className="featuredUsername">{score.username}</span> -{" "}
            {score.score}
          </div>
        ));
      }
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
              <h5 className="featuredGame card-title">
                {gameState} High Scores
              </h5>
            </div>
            <div className="featuredScoresList">
              {allScoresArray.length > 0 ? populateHighScores() : <></>}
            </div>
          </div>
        </div>
        {auth.loggedIn() ? <ChatList /> : <div />}
      </div>
    );
  } catch (err) {
    if (err) console.log(err);
  }
}

export default GamePlay;
