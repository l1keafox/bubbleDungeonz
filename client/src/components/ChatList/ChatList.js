import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER_CHANNELS, GET_ALL_CHANNELS, GET_CHANNEL_BY_NAME } from "../../utils/queries";
import { CREATE_CHANNEL,JOIN_CHANNEL,LEAVE_CHANNEL } from "../../utils/mutations.js";
import ChatWindow from "../ChatWindow/ChatWindow";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { useGameContext, } from "../../utils/gameContext";

let locked = false;
let lastGameChannelId = null;
let lastGameState = "";

export default function ChatList() {
  const { loading, data,startPolling, stopPolling } = useQuery(GET_USER_CHANNELS);
  const [openChannelId, setOpenChannelId] = useState(null);
  const { toggleGameState } = useGameContext();
  const [context, setContext] = useState(useGameContext());
  const [getChannel,{ l, dat }] = useLazyQuery(GET_CHANNEL_BY_NAME);
  const [create,{e,d}] = useMutation(CREATE_CHANNEL);
  const [join,{joinError,joinData}] = useMutation(JOIN_CHANNEL);
  const [leave,{leaveError,leaveData}]=useMutation(LEAVE_CHANNEL);
  const [channelNameString,setChannelNameString] = useState("");
  let location = useLocation();


    const attemptJoin = async (channelId) => {
    await join({variables:{channelId}});
    }
    const attemptLeave = async (channelId) => {
    const test = await leave({variables:{channelId}});
    console.log(test);
    }

  const [channels,setChannels] = useState(data?.memberChannels || []);
  
    useEffect(()=>{
        startPolling(300);
        //on logout doesn't leave channel. needs to check at all times to leave all channels but global
        if(location.pathname=="/gameplay"){
            console.log(location.pathname);
            console.log(context.gameState);
            lastGameState=context.gameState;
            const attemptCreate = async (channelName) => {
                const newChannel = await create({variables:{channelName}});
                lastGameChannelId = newChannel.data.createChannel._id;
                await attemptJoin(newChannel.data.createChannel._id);
            };
            const attemptLoad = async () => {
                const channelNameString = context.gameState;
                console.log("loading");
                console.log(channelNameString);
                const gameChannel = await getChannel({variables:{channelNameString}})
                console.log(gameChannel.data.getChannelByName);
                if(gameChannel.data.getChannelByName){
                    attemptJoin(gameChannel.data.getChannelByName._id);
                    setChannels([...channels,gameChannel.data.getChannelByName])
                }else{
                    console.log("no channel found");
                    if(!locked){
                        attemptCreate(channelNameString);
                        locked = true;
                    }
                    
                }
                
            }
            attemptLoad();
            // lock=false;
          }
          if(location.pathname!='/gameplay'){
            console.log("navigated away");
            console.log(lastGameState);
            console.log(channels)
            let hold = [];
            for(const item of channels){
                if(item.channelName!=lastGameState){
                    hold.push(item);
                    console.log(item);
                }else{
                    attemptLeave(item._id);
                }
            }
            setChannels(hold);
            if(channelNameString==lastGameState){
                setOpenChannelId(null);
            }
            // lock = true;
          }
    },[]);
    useEffect(()=>{
        if(data?.memberChannels){
            setChannels(data.memberChannels);
        }
    },[data])


  function channelOptions({ channels }) {
    if (loading) {
      return <p>loading</p>;
    } else {
      return channels.map((item) => (
        <p
          onClick={() => openChannel(item?._id, item?.channelName)}
          key={item?._id}
          className="channelLink"
        >
          {item?.channelName}
        </p>
      ));
    }
  }
  // openChannel called on click for channel buttons
  function openChannel(id, name) {
    //console.log("opening channel");
    //console.log(id);
    setChannelNameString(name);
    setOpenChannelId(id);
  }
  function closeChannel() {
    setOpenChannelId(null);
  }

function loadedChannels(item) {

    //console.log(channelNameString);
    //console.log(item);
    if(item){
        return  <ChatWindow key={item} channelId={item} />;
    }else{
        return <div></div>;
    }
    
}

  return (
    <aside className="chatAside">
      <div className="chatChannelsList">
        {openChannelId ? (
          <p className="collapseChatBtn" onClick={closeChannel}>
            X
          </p>
        ) : (
          <p></p>
        )}
        {channelOptions({ channels })}
      </div>
      <h3>{openChannelId ? channelNameString :null}</h3>
      {loadedChannels(openChannelId)}
    </aside>
  );
}
