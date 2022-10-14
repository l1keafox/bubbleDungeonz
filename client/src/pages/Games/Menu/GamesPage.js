import React, { useEffect } from "react";
import { useGameContext } from "../../../utils/gameContext.js";
import { Link } from "react-router-dom";
import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";
import {useQuery } from "@apollo/client";
import {GET_GAME_CARDS} from "./../../../utils/queries";
import "./GamesPage.css";
import { BsJoystick } from "react-icons/bs";
import bubbleTroubleImg from "./assets/bubble-trouble-screenshot.png";

function GamesMenu() {
  const { toggleGameState } = useGameContext();
  const { loading, data } = useQuery(GET_GAME_CARDS);
  useEffect(()=>{
    toggleGameState(null);
  },[]);


  return (
    <>
    <div className="menuCardsContainer">
      {loading ? <p>loading</p> : auth.loggedIn()
        ? data.gameCards.map((game,index) => (
            <Link className="gameViewLink" key = {index} name={game.title} to="/gameplay">
              <div
                onClick={() => {
                  toggleGameState(game.title);
                }}
                className="gameViewContainer"
                
              >
                <img src={bubbleTroubleImg} className="gameComponent" alt="BubbleTrouble" />
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
        : data.gameCards.map((game,index) => (
            <Link className="gameViewLink" name={game.title} to="/" key = {index}>
              <div className="gameViewContainer">
                <img src={game.image} className="gameComponent" alt="Trouble Double" />
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
