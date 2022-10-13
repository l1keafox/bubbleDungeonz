import React from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "../../../utils/gameContext.js";
import { Link } from "react-router-dom";
import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";

import "./GamesPage.css";
import { BsJoystick } from "react-icons/bs";
import bubbleTroubleImg from "./assets/bubble-trouble-screenshot.png";

function GamesMenu() {
  let gameOptions = [
    {
      title: "Bubble Trouble",
      description: "How many bubbles can you pop before the time is up?",
      image: bubbleTroubleImg,
    },
    {
      title: "Double Trouble",
      description: "Bubbles AGAIN!?!?",
      image: bubbleTroubleImg,
    },
  ];

  const { toggleGameState } = useGameContext();

  return (
    <div className="menuCardsContainer">
      {gameOptions.map((game) => (
        <Link className="gameViewLink" name={game.title} to="/gameplay">
          <div
            onClick={() => {
              toggleGameState(game.title);
            }}
            className="gameViewContainer"
          >
            <img src={game.image} className="gameComponent" />
            <div className="cardBody">
              <h5 className="cardTitle">{game.title}</h5>
              <p className="cardText">{game.description}</p>

              {auth.loggedIn() ? 
              <Link to="/gameplay">
                <a
                  name={game.title}
                  href="#"
                  className="playBtn btn"
                  onClick={() => {
                    toggleGameState(game.title);
                  }}
                >
                  Play <BsJoystick></BsJoystick>
                </a>
              </Link> :
              <div />}


              {auth.loggedIn() ? <ChatList /> : <div />}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GamesMenu;
