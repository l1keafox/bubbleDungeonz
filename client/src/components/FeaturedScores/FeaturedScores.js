import React from "react";
import "./FeaturedScores.css";

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

  return (
    <div>
      <div className="featuredScoresDiv card">
        <img className="card-img-top" src="" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Featured Game:</h5>
          <h5 className="featuredGameTitle card-title">{game}</h5>
        </div>
        <ul className="featuredScoresList list-group list-group-flush">
          <li className="list-group-item">
            <span className="displayedUsername">{users[0].username}</span> -{" "}
            {users[0].highscore}
          </li>
          <li className="list-group-item">
            {" "}
            <span className="displayedUsername">
              {users[1].username}
            </span> - {users[1].highscore}
          </li>
          <li className="list-group-item">
            {" "}
            <span className="displayedUsername">
              {users[2].username}
            </span> - {users[2].highscore}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FeaturedScores;
