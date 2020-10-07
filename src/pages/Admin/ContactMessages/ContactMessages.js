import React, { useState, useEffect, Suspense, lazy } from "react";
import { getMessagesUnreadApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
const ContactMessagesList = lazy(() => import('../../../components/Admin/ContactMessagesList'));

export default function ContactMessages() {
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [messagesRead, setMessagesRead] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(false);
  const token = getAccessTokenApi();
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
      <Suspense fallback={<></>}>
        <ContactMessagesList
          messagesUnread={messagesUnread}
          messagesRead={messagesRead}
          setReloadMessages={setReloadMessages}
        />
      </Suspense>
    </div>
  );
}
