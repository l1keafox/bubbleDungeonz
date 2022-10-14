import React, { useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "../../../utils/gameContext.js";
import { Link } from "react-router-dom";
import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";

import "./GamesPage.css";
import { BsJoystick } from "react-icons/bs";
import bubbleTroubleImg from "./assets/bubble-trouble-screenshot.png";

function GamesMenu() {
  const { toggleGameState } = useGameContext();

  useEffect(() => {
    toggleGameState(null);
  }, []);

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

  return (
    <>
      <div className="menuCardsContainer">
        {auth.loggedIn()
          ? gameOptions.map((game) => (
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
                    <Link to="/gameplay">
                      <button
                        name={game.title}
                        href="#"
                        className="playBtn btn"
                        onClick={() => {
                          toggleGameState(game.title);
                        }}
                      >
                        Play <BsJoystick />
                      </button>
                    </Link>
                  </div>
                </div>
              </Link>
            ))
          : gameOptions.map((game) => (
              <Link className="gameViewLink" name={game.title} to="/">
                <div className="gameViewContainer">
                  <img src={game.image} className="gameComponent" />
                  <div className="cardBody">
                    <h5 className="cardTitle">{game.title}</h5>
                    <p className="cardText">{game.description}</p>
                    <Link to="/">
                      <button
                        name={game.title}
                        href="#"
                        className="playBtn btn"
                      >
                        Login to Play <BsJoystick />
                      </button>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      {auth.loggedIn() ? <ChatList /> : <></>}
    </>
  );
}

export default GamesMenu;
