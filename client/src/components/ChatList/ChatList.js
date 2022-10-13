import "./ChatList.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CHANNELS, GET_ALL_CHANNELS } from "../../utils/queries";
import ChatWindow from "../ChatWindow/ChatWindow";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";

export default function ChatList() {
  const { loading, data } = useQuery(GET_USER_CHANNELS);
  const [openChannelIds, setOpenChannelIds] = useState([]);
  const channels = data?.memberChannels || [];

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

  function loadedChannels(list) {
    return list.map((item) => <ChatWindow key={item} channelId={item} />);
  }

  return (
    <aside className="chatAside">
      <div className="chatChannelsList">{channelOptions({ channels })}</div>
      {loadedChannels(openChannelIds)}
    </aside>
  );
}
