import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CHANNELS, GET_ALL_CHANNELS, GET_CHANNEL_BY_NAME } from "../../utils/queries";
import { CREATE_CHANNEL,JOIN_CHANNEL,LEAVE_CHANNEL } from "../../utils/mutations.js";
import ChatWindow from "../ChatWindow/ChatWindow";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { useGameContext } from "../../utils/gameContext";

export default function ChatList() {
  const { loading, data,startPolling, stopPolling } = useQuery(GET_USER_CHANNELS);
  const [openChannelIds, setOpenChannelIds] = useState([]);
  const context = useGameContext();
  if(context){
    console.log("in game");
    const gameState = context?.gameState() || "Global"
  }else{
    console.log("out of game");
  }
  
//   if(){
//     const { gameState } = useGameContext();
//     const channelNameString=gameState;
//     let { channelLoading, channelData } = useQuery(GET_CHANNEL_BY_NAME,{variables:{channelNameString}});
//   }
 
  const channels = data?.memberChannels || [];
  
  
  const [create,{e,d}] = useMutation(CREATE_CHANNEL);
  const [join,{joinError,joinData}] = useMutation(JOIN_CHANNEL);
  const [leave,{leaveError,leaveData}]=useMutation(LEAVE_CHANNEL);

  

    useEffect(()=>{
        startPolling(1000);
    },[]);
  function channelOptions({ channels }) {
    if (loading) {
      return <p>loading</p>;
    } else {
      return channels.map((item) => (
        <p
          onClick={() => openChannel(item._id, item.channelName)}
          key={item._id}
          className="channelLink"
        >
          {item.channelName}
        </p>
      ));
    }
  }
  // openChannel called on click for channel buttons
  function openChannel(id, name) {
    console.log(openChannelIds);
    if (!openChannelIds.includes(id)) {
      setOpenChannelIds([id]);
    }
  }
  function closeChannel() {
    setOpenChannelIds([]);
  }

  function loadedChannels(list) {
    return list.map((item) => <ChatWindow key={item} channelId={item} />);
  }

  return (
    <aside className="chatAside">
      <div className="chatChannelsList">
        {openChannelIds.length === 1 ? (
          <p className="collapseChatBtn" onClick={closeChannel}>
            X
          </p>
        ) : (
          <p></p>
        )}
        {channelOptions({ channels })}
      </div>
      {loadedChannels(openChannelIds)}
    </aside>
  );
}
