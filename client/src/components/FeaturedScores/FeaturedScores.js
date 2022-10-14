import React, { useState, useEffect } from "react";

import "./FeaturedScores.css";
import image from "../../pages/Games/Menu/assets/bubble-trouble-screenshot.png";

import { GET_GAME_CARDS } from "../../utils/queries";

function FeaturedScores(props) {
  // Query for all games

  return (
    <div>
      {!props.scores ? (
        <p>loading</p>
      ) : (
        <div>
          <div className="featuredScoresDiv">
            <img
              className="card-img-top featuredGameImg"
              src={image}
              alt="Card image cap"
            />
            <div className="cardBody">
              <h5 className="featuredGame card-title">Featured Game:</h5>
              <h5 className="featuredGameTitle card-title"></h5>
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
              {props.scores.map((score, index) => (
                <div className="featuredScore" key={index}>
                  <span className="featuredUsername">
                    {score.username ? score.username : "foxes"}
                  </span>{" "}
                  - {score.score}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedScores;
