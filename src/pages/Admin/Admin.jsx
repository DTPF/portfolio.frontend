import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { getMessagesUnreadApi } from "../../api/contact";
import { getAccessTokenApi } from "../../api/auth";
import { notifDelayErr } from "../../utils/notifications";
import { checkUserLogin } from "../../providers/AuthProvider";
import addNotification from "react-push-notification";

export default function Admin() {
  const [reloadMessages, setReloadMessages] = useState(false);
  const [messagesUnread, setMessagesUnread] = useState({});
  const token = getAccessTokenApi();
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  useEffect(() => {
    let unmounted = false;
    getMessagesUnreadApi(token, false).then((response) => {
      if (!unmounted) {
        setMessagesUnread(response.messages);
      }
    });
    setReloadMessages(false);
    return () => { unmounted = true };
  }, [reloadMessages, token]);

  return <RenderContent messagesUnread={messagesUnread} user={user} />;
}

function RenderContent(props) {
  const { messagesUnread, user } = props;
  const [mssgLength, setMssgLength] = useState(0);
  useEffect(() => {
    let unmounted = false;
    setMssgLength(messagesUnread.length);
    if (!unmounted) {
    }
    return () => { unmounted = true };
  }, [messagesUnread]);

  let titulo;
  if (user) {
    titulo = (
      <h1>
        Hola
        {user.user.name ? " " + user.user.name : " Anónimo"}
        {user.user.lastname ? " " + user.user.lastname : ""}
      </h1>
    );
  }
  return (
    <div>
      <MessagesNotifications mssgLength={mssgLength} />
      {titulo}
    </div>
  );
}

function MessagesNotifications(props) {
  const { mssgLength } = props;
  useEffect(() => {
    if (mssgLength > 0) {
      notification["warning"]({
        message: `Tienes ${mssgLength} mensajes sin leer.`,
        duration: notifDelayErr,
      });
      addNotification({
        title: `Tienes ${mssgLength} mensajes sin leer.`,
        native: true,
      });
    }
  });
  return null;
}
