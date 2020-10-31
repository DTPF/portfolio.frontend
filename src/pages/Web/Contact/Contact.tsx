import React, { useEffect, Suspense, lazy } from "react";
import "./Contact.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const Soon = lazy(() => import("../../../components/UI/Soon"));

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David Thomas Pizarro Frick"
      />
      <div className="contact">
        <h1 className="contact__title">Contacto</h1>
        <Soon />
      </div>
    </Suspense>
  );
}
