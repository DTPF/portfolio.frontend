import { useState } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../config/url";

export default function useMessagesUnreadLength() {
  const [messagesUnreadLength, setMessagesUnreadLength] = useState(undefined);
  const socket = socketIOClient(ENDPOINT);
  socket.on("getMessagesLength", (data: any) => {
    setMessagesUnreadLength(data);
  });  
  return [messagesUnreadLength];
}