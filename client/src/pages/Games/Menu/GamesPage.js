import React, { useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
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
  const { loading, data,startPolling, stopPolling } = useQuery(GET_GAME_CARDS);
  useEffect(()=>{
    toggleGameState(null);
  },[]);


  return (
    <div className="menuCardsContainer">
      {loading ? <p>loading</p> : data.gameCards.map((game) => (
        <Link className="gameViewLink" name={game.title} to="/gameplay">
          <div
            onClick={() => {
              toggleGameState(game.title);
            }}
            className="gameViewContainer"
          >
            <img src={bubbleTroubleImg} className="gameComponent" />
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
