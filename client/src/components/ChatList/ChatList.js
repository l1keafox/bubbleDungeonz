import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CHANNELS } from "../../utils/queries";
import ChatWindow from "../ChatWindow/ChatWindow";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";

export default function ChatList(){
    const {loading,data} = useQuery(GET_USER_CHANNELS);
    const [openChannelIds,setOpenChannelIds] = useState([]);
    const channels = data?.memberChannels || [];

    function channelOptions({channels}){
        console.log(channels);
        return channels.map((item)=><a onClick={() => openChannel(item._id,item.channelName)} key={item._id}>{item.channelName}</a>);
    }
    function openChannel(id,name){
        if(!openChannelIds.includes(id)){
            setOpenChannelIds([...openChannelIds,id])
        }
    }
    function loadedChannels(list){
        return list.map((item)=><ChatWindow key="1" channelId={item}/>)
    }

    return(
        <aside>
            <ul>
                {loading ?(
                    <p>loading</p>
                ):(
                    <p>{channelOptions({channels})}</p>
                )}
            </ul>
            {loadedChannels(openChannelIds)}
        </aside>
    );

}