import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CHANNELS } from "../../utils/queries";

export default function ChatList(){
    const context = useExistingUserContext();

    useEffect(()=>{
        getChannelList();
    });

    const getChannelList = async () => {
        console.log(context);
        const {loading,error,data} = await useQuery(GET_USER_CHANNELS,{
            variables:{}
        });
    }

    return(
        <div>

        </div>
    );

}