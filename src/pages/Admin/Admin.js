import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { getMessagesUnreadApi } from "../../api/contact";
import { getAccessTokenApi } from "../../api/auth";
import { notifDelayErr } from '../../utils/notifications';
import { checkUserLogin } from '../../providers/AuthProvider';

export default function Admin() {
  const [reloadMessages, setReloadMessages] = useState(false);
  const [messagesUnread, setMessagesUnread] = useState({});
  const token = getAccessTokenApi();
  let messagesLenght = messagesUnread.length ? messagesUnread.length : 0;
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unmounted = false;
    getMessagesUnreadApi(token, false).then((response) => {
      if (!unmounted) {
        checkUserLogin(setUser);
        setMessagesUnread(response.messages);
        if (messagesLenght > 0) {
          notification["warning"]({
            message: `Tienes ${messagesLenght} mensajes sin leer.`,
            duration: notifDelayErr,
          });
        }
      }
    });
    setReloadMessages(false);
    return () => { unmounted = true };
  }, [reloadMessages, messagesLenght, token]);

  let titulo;
  if (user) {
    titulo = (
      <h1>
        Hola
        {user.user.name ? " " + user.user.name : " Anónimo"}
        {user.user.lastname ? " " + user.user.lastname : ""}
      </h1>
    )
  }

  return (
    <div>
      {titulo}
    </div>
  );
}
