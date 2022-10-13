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
  // Pick a game at random from the list
  // let id = game.id

  const { loading, data } = useQuery(GET_GAME_CARDS);
  console.log(data, "datat?1");

  // card for featured game
  const featuredGameCard = data.filter((gameCard) => id === gameCard.id);

  // array of all scores from featured game in descending order
  const allScoresArray = featuredGameCard.scores
    .map((score) => ({
      score: score.score,
      username: score.user.username,
    }))
    .sort(score);

  // reduced to 5 scores
  let highScoresArray = [];
  for (var i = 0; i < 5; i++) {
    highScoresArray.push(allScoresArray[i]);
  }

  function populateHighScores() {
    if (loading) {
      return <p>loading</p>;
    } else {
      return;
      // list items of username - score
      // map over highScoresArray
      highScoresArray.map((score) => (
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
        <div className="featuredScoresList">
          {users.map((user) => (
            <div className="featuredScore">
              <span className="featuredUsername">{user.username}</span> -{" "}
              {user.highscore}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedScores;
