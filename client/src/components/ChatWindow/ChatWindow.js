import "./ChatWindow.css";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_CHANNEL_MESSAGES } from "../../utils/queries";
import { POST_MESSAGE_TO_CHANNEL } from "../../utils/mutations";

import auth from "../../utils/auth";
// import { useExistingUserContext } from "../../utils/existingUserContext";

export default function ChatWindow(props) {
  const scrollElement = useRef();
  const bottomTarget = useRef();
  const [canScrollDown, setCanScrollDown] = useState(true);
  const [limit, setLimit] = useState(10);
  // const [messages, setMessages] = useState([]);
  const [channelId] = useState(props.channelId);
  // const [channelNameString,setChannelName] = useState(props?.channelName);
  // const { l, dat } = useQuery(GET_CHANNEL_BY_NAME,{variables:{channelNameString}});

  //TODO scroll to bottom of div.
  // const bottomRef = useRef();
  const currentUser = auth.getUser().data.username;
  const { loading, data, startPolling } = useQuery(GET_CHANNEL_MESSAGES, {
    variables: { channelId, limit },
  });

  const executeScroll = () => {
    bottomTarget.current.scrollIntoView();
    setCanScrollDown(false);
  };

  useEffect(() => {
    startPolling(300);
    executeScroll();
  }, []);
  useEffect(() => {
    if (!canScrollDown) {
      executeScroll();
    }
  });

  const channels = data?.channelMessages || [];

  //recursive link text parser, splits on first valid link, wraps <a> around it, and then splits next chunk of text, returns when no link is found.
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

  //generates container element for each message, shows username. todo, add logic to assign class name and formatting based on whether the username matches current user.
  function chatListItems(messages, userMatch) {
    if (loading) {
      return <p>loading</p>;
    } else {
      return messages?.map((message) => {
        if (message.username === userMatch) {
          return (
            
              <li className="ownMessage" key={message._id}>
                <div>
                {parseLinkInText(message.messageText)} |
                <span className="displayedOwnUsername">{message.username}</span>
                </div>
              </li>
              
            
          );
        } else {
          return (
            
              <li className="otherMessage" key={message._id}>
                <div>
                <span className="displayedUsername">{message.username}</span>|{" "}
                {parseLinkInText(message.messageText)}
                </div>
              </li>
            
          );
        }
      });
    }
  }

  //increases the number of messages fetched when "load older messages" is clicked.
  function incrementLimit() {
    setCanScrollDown(true);
    setLimit(limit + 3);
  }

  //generates element for the scrollable div
  return (
    <div className="channelFeedFormContainer">
      {/* no name is being handed down here */}
      <h1 className="channelTitle">{props.name}</h1>
      <div className="scrollable-div" ref={scrollElement}>
        <p className="loadMore" onClick={incrementLimit}>
          Load Older Messages
        </p>
        <ul className="chatFeed">
          {chatListItems(channels.messages, currentUser)}
        </ul>
        <div ref={bottomTarget}></div>
      </div>
      {canScrollDown ? (
        <button className="scrollBtn" onClick={executeScroll}>
          scroll to bottom
        </button>
      ) : (
        <div></div>
      )}
      <MessageEditor channelId={props.channelId} />
    </div>
  );
}
//generates and manages the component that the user edits messages with. Takes channel id, and posts messages itself.
function MessageEditor(props) {
  const [post] = useMutation(POST_MESSAGE_TO_CHANNEL);
  const [value, setValue] = useState("");
  const channelId = props.channelId;
  function handleChange(e) {
    setValue(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await send(value);
    setValue("");
  }

  async function send(messageText) {
    await post({ variables: { channelId, messageText } });
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
