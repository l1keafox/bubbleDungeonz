import React from "react";
import { useQuery } from "@apollo/client";

import "./FeaturedScores.css";
import image from "../../pages/Games/Menu/assets/bubble-trouble-screenshot.png";

import { GET_GAME_CARDS } from "./../../utils/queries";

function FeaturedScores() {
  let game = "Bubble Trouble";
  let users = [
    {
      username: "feat1",
      highscore: 34000,
    },
    {
      username: "feat2",
      highscore: 23000,
    },
    {
      username: "feat3",
      highscore: 21000,
    },
  ];

  // Query for all games
  const { loading, data } = useQuery(GET_GAME_CARDS);
  console.log(data);

  // Pick a game at random from the list
  let featuredGame =
    data.gameCards[Math.floor(Math.random() * data.gameCards.length)];
  console.log(featuredGame);

  // array of all scores from featured game in descending order
  const allScoresArray = featuredGame.scores
    .map((score) => ({
      score: score.scores,
      username: score.user.username,
    }))
    .sort();
  console.log(allScoresArray); //array

  // reduced to 5 scores
  let highScoresArray = [];
  for (var i = 0; i < 5; i++) {
    highScoresArray.push(allScoresArray[i]);
  }
  console.log(highScoresArray);

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
          <h5 className="featuredGameTitle card-title">{game}</h5>
        </div>
        <div className="featuredScoresList">{() => populateHighScores()}</div>
      </div>
    </div>
  );
}

export default FeaturedScores;
