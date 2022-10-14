import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER_CHANNELS, GET_ALL_CHANNELS, GET_CHANNEL_BY_NAME } from "../../utils/queries";
import { CREATE_CHANNEL,JOIN_CHANNEL,LEAVE_CHANNEL } from "../../utils/mutations.js";
import ChatWindow from "../ChatWindow/ChatWindow";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { useGameContext } from "../../utils/gameContext";

let lock = true;
let lastGameChannelId = null;

export default function ChatList() {
  const { loading, data,startPolling, stopPolling } = useQuery(GET_USER_CHANNELS);
  const [openChannelIds, setOpenChannelIds] = useState([]);
  const [context, setContext] = useState(useGameContext());
  const [getChannel,{ l, dat }] = useLazyQuery(GET_CHANNEL_BY_NAME);
  const [create,{e,d}] = useMutation(CREATE_CHANNEL);
  const [join,{joinError,joinData}] = useMutation(JOIN_CHANNEL);
  const [leave,{leaveError,leaveData}]=useMutation(LEAVE_CHANNEL);


  let channelNameString = "Global"
    const attemptJoin = async (channelId) => {
    await join({variables:{channelId}});
    }
    const attemptLeave = async (channelId) => {
    await leave({variables:{channelId}});
    }

  const channels = data?.memberChannels || [];
  
    useEffect(()=>{
        startPolling(1000);

        if(context?.gameState && lock){
            channelNameString = context.gameState;
            const attemptCreate = async (channelName) => {
                const newChannel = await create({variables:{channelName}});
                lastGameChannelId = newChannel.data.createChannel._id;
                await attemptJoin(newChannel.data.createChannel._id);
            };
            const load = async () => {
                const test = await getChannel({variables:{channelNameString}});
                if(test.data.getChannelByName){
                    lastGameChannelId = test.data.getChannelByName._id
                    //join channel
                    attemptJoin(lastGameChannelId);
                }else{
                    //create and join channel
                    attemptCreate(channelNameString);
                }
                
            }
            load();
            lock=false;
          }
          if(!context?.gameState){
            if(lastGameChannelId){
                //leave channel
                attemptLeave(lastGameChannelId);
                lastGameChannelId = null;
            }
            lock = true;
          }
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
