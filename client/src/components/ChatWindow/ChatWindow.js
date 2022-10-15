import "./ChatWindow.css";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_CHANNEL_MESSAGES,GET_CHANNEL_BY_NAME } from "../../utils/queries";
import { POST_MESSAGE_TO_CHANNEL } from "../../utils/mutations";

import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";

export default function ChatWindow(props) {
  const [messages, setMessages] = useState([]);
  const [channelId, setChannelId] = useState(props.channelId);
  const [channelNameString,setChannelName] = useState(props?.channelName);
  const { l, dat } = useQuery(GET_CHANNEL_BY_NAME,{variables:{channelNameString}});

  const bottomRef = useRef();

  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_CHANNEL_MESSAGES,
    { variables: { channelId } }
  );
  useEffect(() => {
    startPolling(1000);
  },[]);
  useEffect(()=>{
    console.log("checking channel by name")
    console.log(props.channelName);
    console.log(l);
    console.log(dat);
  },[]);

  const channels = data?.channelMessages || [];

  //recursive
  function parseLinkInText(text) {
    let validLink = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+"
    );
    if (validLink.test(text)) {
      let linkMatches = text.match(validLink);
      let beforeAndAfterLink = text.split(linkMatches[0]);
      return (
        <span>
          {beforeAndAfterLink[0]}
          <a href={linkMatches[0]}>{linkMatches[0]}</a>
          {parseLinkInText(beforeAndAfterLink[1])}
        </span>
      );
    } else {
      return <span>{text}</span>;
    }
  }

  function chatListItems(messages) {
    if (loading) {
      return <p>loading</p>;
    } else {
      return messages?.map((message) => {
        return (
          <li key={message._id}>
            <span className="displayedUsername">{message.username}</span>:{" "}
            {parseLinkInText(message.messageText)}
          </li>
        );
      });
    }
  }

  return (
    <div className="channelFeedFormContainer">
      {/* no name is being handed down here */}
      <h1>{props.name}</h1>
      <div className="scrollable-div">
        <a className="loadMore">Load Older Messages</a>
        <ul className="chatFeed">
          {chatListItems(channels.messages)}
        </ul>
        <div></div>
      </div>
      <MessageEditor channelId={props.channelId} />
    </div>
  );
}

function MessageEditor(props) {
  const [post, { error, info }] = useMutation(POST_MESSAGE_TO_CHANNEL);
  const [value, setValue] = useState("");
  const channelId = props.channelId;
  function handleChange(e) {
    setValue(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const test = await send(value);
    setValue("");
  }

  async function send(messageText) {
    const { info } = await post({ variables: { channelId, messageText } });
  }
  return (
    <form className="messageForm" id="form" action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        id="input"
        autoComplete="off"
        className="messageInput"
      />
      <button className="sendBtn">Send</button>
    </form>
  );
}
