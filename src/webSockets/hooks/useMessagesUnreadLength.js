import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../config/url";

export default function useMessagesUnreadLength() {
  const [messagesUnreadLength, setMessagesUnreadLength] = useState(undefined);
  useEffect(() => {
    let socket = socketIOClient(ENDPOINT);
    socket.on("getMessagesLength", (data) => {
      setMessagesUnreadLength(data);
    });
    return () => socket.disconnect();
  }, []);
  return messagesUnreadLength;
}