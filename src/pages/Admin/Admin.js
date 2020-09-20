import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { getMessagesUnreadApi } from "../../api/contact";
import { getAccessTokenApi } from "../../api/auth";

export default function Admin() {
  const [reloadMessages, setReloadMessages] = useState(false);
  const [messagesUnread, setMessagesUnread] = useState({});
  const token = getAccessTokenApi();
  let messagesLenght = messagesUnread.length ? messagesUnread.length : 0;
  useEffect(() => {
    let unmounted = false;
    getMessagesUnreadApi(token, false).then((response) => {
      if (!unmounted) {
        setMessagesUnread(response.messages);
        if (messagesLenght > 0) {
          notification["warning"]({
            message: `Tienes ${messagesLenght} mensajes sin leer.`,
            duration: 5,
          });
        }
      }
    }); 
    setReloadMessages(false);
    return () => { unmounted = true };
  }, [reloadMessages, messagesLenght, token]);

  return (
    <div>
      <h1>Estamos en Admin Home</h1>
    </div>
  );
}
