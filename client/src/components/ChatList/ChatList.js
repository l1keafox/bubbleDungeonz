import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CHANNELS,GET_ALL_CHANNELS } from "../../utils/queries";
import ChatWindow from "../ChatWindow/ChatWindow";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";

export default function ChatList(){
    const {loading,data} = useQuery(GET_USER_CHANNELS);
    const [openChannelIds,setOpenChannelIds] = useState([]);
    const channels = data?.memberChannels || [];

    function channelOptions({channels}){
        if(loading){
            return <p>loading</p>
        }else{
            return channels.map((item)=><li onClick={() => openChannel(item._id,item.channelName)} key={item._id}>{item.channelName}</li>);
        }
        
    }
    function openChannel(id,name){
        if(!openChannelIds.includes(id)){
            setOpenChannelIds([...openChannelIds,id])
        }
    }
    function loadedChannels(list){
        return list.map((item)=><ChatWindow key={item} channelId={item}/>)
    }

    return(
        <aside>
            <ul>
                {channelOptions({channels})}
            </ul>
            {loadedChannels(openChannelIds)}
        </aside>
    );

}