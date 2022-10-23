import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER_CHANNELS, GET_ALL_CHANNELS } from "../../utils/queries";
import { CREATE_CHANNEL,JOIN_CHANNEL,LEAVE_CHANNEL } from "../../utils/mutations.js";
import ChatWindow from "../ChatWindow/ChatWindow";
import { useGameContext, } from "../../utils/gameContext";

let locked = false;


let lastGameState = "";

export default function ChatList() {
const [getAll] = useLazyQuery(GET_ALL_CHANNELS);
  const { loading, data,startPolling } = useQuery(GET_USER_CHANNELS);
  const [openChannelId, setOpenChannelId] = useState(null);
  const [context] = useState(useGameContext());
  const [create] = useMutation(CREATE_CHANNEL);
  const [join] = useMutation(JOIN_CHANNEL);
  const [leave]=useMutation(LEAVE_CHANNEL);
  const [channelName,setChannelNameString] = useState("");
  let location = useLocation();

    //attempts to add the current user to the participants list in the channel.
    const attemptJoin = async (channelId) => {
    await join({variables:{channelId}});
    }
    //attempts to remove the current user from the participants list of the channel
    const attemptLeave = async (channelId) => {
     await leave({variables:{channelId}});
    }

    //master list of available channels, this is mapped onto the channel tabs.
  const [channels,setChannels] = useState(data?.memberChannels || []);
  
    useEffect(()=>{
        startPolling(300);
        //trigger while in game
        if(location.pathname === "/gameplay"){

            //tracks the previous game state to be able to reference the last focused location.
            lastGameState=context.gameState;

            //creates a chat channel for the current context if none exists.
            const attemptCreate = async (channelName) => {
                const newChannel = await create({variables:{channelName}});
                
                attemptJoin(newChannel.data.createChannel._id);
            };

            //attempts to load and joins the current game state's channel
            const attemptLoad = async (gs) => {
                //sets the channel name to be displayed.
                setChannelNameString(gs);

                //fetches all, network policy ignores the already cached data.
                const all = await getAll({fetchPolicy: 'network-only'});

                //checks for existing channel for current game state.
                let match = false;
                for (const channel of all.data.channels){
                    if(channel.channelName === gs){
                        match=true;
                        attemptJoin(channel._id);
                    }
                }

                //Creates a new channel if one doesn't exist yet.
                if(!match && !locked){
                    //no match found
                    attemptCreate(gs);
                    locked = true;
                }
            }
            attemptLoad(context.gameState);
          }
          //When not in game
          if(location.pathname !=='/gameplay'){

            //search current channels for the one matching the last focused area and remove it.
            let hold = [];
            for(const item of channels){
                if(item.channelName !== lastGameState){
                    hold.push(item);
                }else{
                    attemptLeave(item._id);
                }
            }
            //set new channel list
            setChannels(hold);
            //close chat window if navigating away from a game.
            if(channelName === lastGameState){
                setOpenChannelId(null);
            }
            //allow creation of a new channel when entering a novel context.
            locked = false;
          }
    },[]);
    useEffect(()=>{
        if(data?.memberChannels){
            setChannels(data.memberChannels);
        }
    },[data])

    //generates the tab list of available channels the user can switch between.
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
    //sets the heading of whichever channel the user selects
    setChannelNameString(name);
    //queues up the channel to be opened
    setOpenChannelId(id);
  }

  function closeChannel() {
    setOpenChannelId(null);
  }

    //generates a chat window for the open channel
    function loadedChannels(item) {

        if(item){
            //name required for window styling
            return  <ChatWindow key={item} channelId={item} name={channelName} />;
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
      {/* <h3>{openChannelId ? channelName :null}</h3> */}
      {loadedChannels(openChannelId)}
    </aside>
  );
}
