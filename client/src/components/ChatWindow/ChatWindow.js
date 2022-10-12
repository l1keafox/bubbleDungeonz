
import "./ChatWindow.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";


import { GET_CHANNEL_MESSAGES } from "../../utils/queries";
import { POST_MESSAGE_TO_CHANNEL } from "../../utils/mutations";


import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";



export default function ChatWindow(props){
    
    const [messages,setMessages] = useState([]);
    const [channelId,setChannelId] = useState(props.channelId);
    

    const {loading,data} = useQuery(GET_CHANNEL_MESSAGES,{variables:{channelId}});
    const channels = data?.channelMessages || [];

    function parseLinkInText(text){
        let validLink = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
        if(validLink.test(text)){
            let linkMatches = text.match(validLink);
            let beforeAndAfterLink = text.split(linkMatches[0]);
            return <span>{beforeAndAfterLink[0]}<a href={linkMatches[0]}>{linkMatches[0]}</a>{parseLinkInText(beforeAndAfterLink[1])}</span>;
        }else{
            return <span>{text}</span>;
        }
    
    }
    function chatListItems(messages){
        if(loading){
            return <p>loading</p>
        }else{
            return messages.map((message) => {
                return <li key={message._id}>{message.username}: {parseLinkInText(message.messageText)}</li>
              }
            )
        }
        
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <div className='scrollable-div'>
              <a className='loadMore'>Load Older Messages</a>
              <ul>
                  {chatListItems(channels.messages)}
              </ul>
            </div>
            <MessageEditor channelId={props.channelId}/>
        </div>
    );
}

function MessageEditor(props){
    const [post,{error,info}] = useMutation(POST_MESSAGE_TO_CHANNEL);
    const [value,setValue] = useState("");
    const channelId=props.channelId;
    function handleChange(e){
        setValue(e.target.value);
    }
    async function handleSubmit(e){
        e.preventDefault();
        const test = await send(value);
        setValue("");
    }

    async function send(messageText){
        const {info} = await post({variables:{channelId,messageText}});
    }
    return(
        <form id="form" action="" onSubmit={handleSubmit}>
              <input type="text" value={value} onChange={handleChange} id="input" autoComplete="off" /><button>Send</button>
          </form>
    );
}