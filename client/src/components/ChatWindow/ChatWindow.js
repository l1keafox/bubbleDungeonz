import "./ChatWindow.css";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_CHANNEL_MESSAGES,GET_CHANNEL_BY_NAME } from "../../utils/queries";
import { POST_MESSAGE_TO_CHANNEL } from "../../utils/mutations";

import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";

export default function ChatWindow(props) {

  const [limit,setLimit] = useState(3)
  const { loggedIn, setLogin } = useExistingUserContext();
  const [messages, setMessages] = useState([]);
  const [channelId, setChannelId] = useState(props.channelId);
  const [channelNameString,setChannelName] = useState(props?.channelName);
  const { l, dat } = useQuery(GET_CHANNEL_BY_NAME,{variables:{channelNameString}});

  //TODO scroll to bottom of div.
  const bottomRef = useRef();
  const currentUser = auth.getUser().data.username;
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_CHANNEL_MESSAGES,
    { variables: { channelId, limit } }
  );

  useEffect(() => {
    startPolling(300);
  },[]);

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
  function chatListItems(messages,userMatch) {
    if (loading) {
      return <p>loading</p>;
    } else {
      return messages?.map((message) => {
        if(message.username == userMatch){
          return (
            <div>
              <li className="ownMessage" key={message._id}>
                {parseLinkInText(message.messageText)}{" "}|<span className="displayedOwnUsername">{message.username}</span>
              </li>
              <br></br>
            </div>
          );
        }else{
          return (
            <div>
              <li className="otherMessage" key={message._id}>
                  <span className="displayedUsername">{message.username}</span>|{" "}{parseLinkInText(message.messageText)}
              </li>
              <br></br>
            </div>
          );
        }
        
      });
    }
  }

  //increases the number of messages fetched when "load older messages" is clicked.
  function incrementLimit(){
    setLimit((limit+3));
  }

  //generates element for the scrollable div
  return (
    <div className="channelFeedFormContainer">
      {/* no name is being handed down here */}
      <h1>{props.name}</h1>
      <div className="scrollable-div">
        <a className="loadMore" onClick={incrementLimit}>Load Older Messages</a>
        <ul className="chatFeed">
          {chatListItems(channels.messages,currentUser)}
        </ul>
        <div></div>
      </div>
      <MessageEditor channelId={props.channelId} />
    </div>
  );
}
//generates and manages the component that the user edits messages with. Takes channel id, and posts messages itself.
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
