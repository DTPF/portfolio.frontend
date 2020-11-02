import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ContactPage = lazy(() => import("../../../components/Web/Contact"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));

export default function Contact(props: any) {
  const { location } = props;
  const goBack = useHistory().goBack;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={goBack} eventGoBack="contacto" />
      <ContactPage location={location} />
    </Suspense>
  );
}
