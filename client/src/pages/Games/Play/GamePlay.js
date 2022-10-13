import React, { useEffect } from "react";
import Canvas from "../../../components/Canvas/Canvas.js";
import { useGameContext } from "./../../../utils/gameContext";
import "./GamePlay.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CHANNEL_BY_NAME } from "../../../utils/queries";
import { CREATE_CHANNEL,JOIN_CHANNEL,LEAVE_CHANNEL } from "../../../utils/mutations.js";

import auth from "../../../utils/auth";
import ChatList from "../../../components/ChatList/ChatList.js";

function GamePlay() {
  const { gameState } = useGameContext();
  // changeTitle(gameState);
  let game;
  console.log(gameState);
  const channelNameString=gameState;
  const { loading, data } = useQuery(GET_CHANNEL_BY_NAME,{variables:{channelNameString}});
  const [create,{e,d}] = useMutation(CREATE_CHANNEL);
  const [join,{joinError,joinData}] = useMutation(JOIN_CHANNEL);
  
  useEffect(()=>{
      console.log(data);
      if(data?.getChannelByName){
        console.log("Channel Found");
        console.log(data.getChannelByName);
        const channelId = data.getChannelByName._id;
        join({variables:{channelId}})
      }else{
        console.log("no channel found");
        const channelName = gameState;
        //Need to add logic to generate a new channel if there isn't one.
        //create({variables:{channelName}}).then((moreData)=>{console.log(moreData)});
      }
  },[data]);

  switch (gameState) {
    case "Bubble Trouble":
      game = <Canvas />;
      break;
    default:
      game = <Canvas />;
      break;
  }
  return (
    <>
      <div className="canvasContainer">
        <h1>{gameState}</h1>
        {game}
      </div>
      {auth.loggedIn() ? <ChatList /> : <div />}
    </>
  );
}

export default GamePlay;
