import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/client";

import "./FeaturedScores.css";
import image from "../../pages/Games/Menu/assets/bubble-trouble-screenshot.png";

import { GET_GAME_CARDS } from "./../../utils/queries";

function FeaturedScores() {
  // Query for all games
  const { loading, error, data } = useQuery(GET_GAME_CARDS); //async not functioning

  useEffect(()=>{
    const gameCards = data?.gameCards || [];

    // Pick a game at random from the list
    let randomGameIndex = Math.floor(Math.random() * gameCards.length);
    // let featuredGame = gameCards[randomGameIndex];
    let featuredGame = gameCards[0]; //until the system has more than one game

    // array of all scores from featured game in descending order
    const allScoresArray = featuredGame.scores
      .map((score) => ({
        score: score.score,
        username: score.user.username,
      }))
      .sort((a, b) => a - b); //not successfully sorting the array members - they're objects :(

    // reduced to 5 scores
    let highScoresArray = [];
    for (
      var i = allScoresArray.length - 1;
      i > allScoresArray.length - 6;
      i--
    ) {
      highScoresArray.push(allScoresArray[i]);
    }    
  },[data]);


  return (
    <div>
        {loading ? <p>loading</p> :      
        <div>
        <div className="featuredScoresDiv">
          <img
            className="card-img-top featuredGameImg"
            src={image}
            alt="Card image cap"
          />
          <div className="cardBody">
            <h5 className="featuredGame card-title">Featured Game:</h5>
            <h5 className="featuredGameTitle card-title">

            </h5>
          </div>
          <hr
            style={{
              height: "1px",
              width: "95%",
              borderWidth: "0",
              color: "yellow",
              backgroundColor: "yellow",
              margin: ".5rem",
            }}
          />
          <div className="featuredScoresList">
            <h5 className="highScores card-title">High Scores</h5>

          </div>
        </div>
      </div> }
    </div>
  );

}

export default FeaturedScores;
