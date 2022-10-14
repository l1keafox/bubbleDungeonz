import React from "react";
import { useQuery } from "@apollo/client";

import "./FeaturedScores.css";
import image from "../../pages/Games/Menu/assets/bubble-trouble-screenshot.png";

import { GET_GAME_CARDS } from "./../../utils/queries";

function FeaturedScores() {
  // Query for all games
  const { loading, error, data } = useQuery(GET_GAME_CARDS); //async not functioning
  console.log(data);

  // Pick a game at random from the list
  let featuredGame =
    data.gameCards[Math.floor(Math.random() * data.gameCards.length)];
  console.log(featuredGame);

  // array of all scores from featured game in descending order
  const allScoresArray = featuredGame.scores
    .map((score) => ({
      score: score.score,
      username: score.user.username,
    }))
    .sort((a, b) => a - b); //not successfully sorting the array members - they're objects :(
  console.log(allScoresArray);

  // reduced to 5 scores
  let highScoresArray = [];
  for (var i = allScoresArray.length - 1; i > allScoresArray.length - 6; i--) {
    highScoresArray.push(allScoresArray[i]);
  }
  console.log(highScoresArray);
  console.log(highScoresArray.map((score) => score.score));

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
    <div>
      <div className="featuredScoresDiv">
        <img
          className="card-img-top featuredGameImg"
          src={image}
          alt="Card image cap"
        />
        <div className="cardBody">
          <h5 className="featuredGame card-title">Featured Game:</h5>
          <h5 className="featuredGameTitle card-title">{featuredGame.title}</h5>
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
          {populateHighScores()}
        </div>
      </div>
    </div>
  );
}

export default FeaturedScores;
