import React, { useState, useEffect, Suspense, lazy } from "react";
import { getMessagesUnreadApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
import { reloadMessagesFalseApi } from "../../../api/utils";
import useMessagesStatus from "../../../hooks/useMessagesStatus";
const ContactMessagesList = lazy(() => import("../../../components/Admin/ContactMessagesList"));
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));

export default function ContactMessages() {
  const { messagesStatus, setMessagesStatus } = useMessagesStatus();
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [messagesRead, setMessagesRead] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(false);
  const token = getAccessTokenApi();
  useEffect(() => {
    let unmounted = false;
    reloadMessagesFalseApi().then(() => {
      if (!unmounted) {
        setReloadMessages(false);
        setMessagesStatus(false);
      }
    });
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
    return () => { unmounted = true };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesStatus, reloadMessages]);    
  return (
    <div>
      <Suspense fallback={<></>}>
        <HelmetAnalytics
          titleHelmet="DTPF | Admin Mensajes"
          contentHelmet="Página admin de Mensajes"
        />
        <ContactMessagesList
          messagesUnread={messagesUnread}
          messagesRead={messagesRead}
          setReloadMessages={setReloadMessages}
        />
      </Suspense>
    </div>
  );
}
