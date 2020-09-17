import React, { useState, useEffect } from "react";
import { getMessagesUnreadApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
import MessagesContact from "../../../components/Admin/MessagesContact";

export default function ContactMessages() {
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [messagesRead, setMessagesRead] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    getMessagesUnreadApi(token, false).then((response) => {
      setMessagesUnread(response.messages);
    });
    getMessagesUnreadApi(token, true).then((response) => {
      setMessagesRead(response.messages);
    });
    setReloadMessages(false);
  }, [reloadMessages, token]);

  return (
    <div>
      <MessagesContact
        messagesUnread={messagesUnread}
        messagesRead={messagesRead}
        setReloadMessages={setReloadMessages}
      />
    </div>
  );
}
