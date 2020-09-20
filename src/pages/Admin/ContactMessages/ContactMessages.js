import React, { useState, useEffect } from "react";
import { getMessagesUnreadApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
import ContactMessagesList from "../../../components/Admin/ContactMessagesList";
import { Spin } from "antd";

export default function ContactMessages() {
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [messagesRead, setMessagesRead] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(false);
  const token = getAccessTokenApi();
  let messagesLength = messagesUnread.length ? messagesUnread.length : 0;

  useEffect(() => {
    let unmounted = false;
    getMessagesUnreadApi(token, false).then((response) => {
      if (!unmounted) {
        setMessagesUnread(response.messages);
      }
    });
    getMessagesUnreadApi(token, true).then((response) => {
      if (!unmounted) {
        setMessagesRead(response.messages);
      }
    });
    setReloadMessages(false);
    return () => { unmounted = true }
  }, [reloadMessages, token]);

  return (
    <div>
      {messagesLength === 0 ? (
        <Spin
          tip="Cargando mensajes"
          style={{
            textAlign: "center",
            width: "100%",
            padding: "20px",
            marginTop: "200px"
          }}
        />
      ) : (
      <ContactMessagesList
        messagesUnread={messagesUnread}
        messagesRead={messagesRead}
        setReloadMessages={setReloadMessages}
      />
      )}
    </div>
  );
}
