import React, { useEffect, Suspense, lazy } from "react";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ContactPage = lazy(() => import("../../../components/Web/Contact"));

export default function Contact(props: any) {
  const { location } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David Thomas Pizarro Frick"
      />
      <ContactPage location={location} />
    </Suspense>
  );
}
