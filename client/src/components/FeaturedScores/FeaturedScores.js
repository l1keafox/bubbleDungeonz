import React,{useState,useEffect} from "react";

import "./FeaturedScores.css";
import image from "../../pages/Games/Menu/assets/bubble-trouble-screenshot.png";

function FeaturedScores(props) {
  // Query for all games
  let [display,changeDisplay] = useState("featuredScoresDiv");

  useEffect( () =>{
    changeDisplay("featuredScoresDiv show");
  }, [] );
  useEffect( () => () => changeDisplay("featuredScoresDiv"), [] );

  return (
    <div>
      {!props.scores ? (
        <p>loading</p>
      ) : (
        <div>
          <div className={display}>
            <img
              className="card-img-top featuredGameImg"
              src={image}
              alt="FeaturedGame"
            />
            <div className="cardBody">
              <h5 className="featuredGame card-title">Featured Game:</h5>
              <h5 className="featuredGameTitle card-title">{props.title}</h5>
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
                    {score.user.username ? score.user.username : "null??!"}
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
