import React, { useState, Suspense, lazy } from "react";
const ContactMessagesList = lazy(() => import("../../../components/Admin/ContactMessagesList"));
const Helmet = lazy(() => import("../../../components/Helmet"));

export default function ContactMessages() {
  const [reloadMessages, setReloadMessages] = useState(false);  
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Mensajes"
        contentHelmet="Página admin de Mensajes"
      />
      <ContactMessagesList
        reloadMessages={reloadMessages}
        setReloadMessages={setReloadMessages}
      />
    </Suspense>
  );
}
