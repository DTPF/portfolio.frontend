import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { getMessagesUnreadApi } from "../../api/contact";
import { getAccessTokenApi } from "../../api/auth";

export default function Admin() {
  const [reloadMessages, setReloadMessages] = useState(false);
  const [messagesUnread, setMessagesUnread] = useState({});
  const token = getAccessTokenApi();
  const msgUnr = messagesUnread.length;

  useEffect(() => {
    getMessagesUnreadApi(token, false).then((response) => {
      setMessagesUnread(response.messages);
    }); 
    if (msgUnr > 0) {
      notification["warning"]({
        message: `Tienes ${msgUnr} mensajes sin leer.`,
        duration: 5,
      });
    } 
    setReloadMessages(false);
  }, [reloadMessages, msgUnr, token]);

  return (
    <div>
      <h1>Estamos en Admin Home</h1>
    </div>
  );
}
