import React from "react";
import "./FeaturedScores.css";
import image from "../../pages/Games/Menu/assets/bubble-trouble-screenshot.png";
import {GET_SCORE_CARDS} from "./../../utils/queries";
import { useQuery } from "@apollo/client";
function FeaturedScores() {
  let game = "Bubble Trouble";
  const { loading, data } = useQuery(GET_SCORE_CARDS);
  console.log(data,"datat?1");
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
