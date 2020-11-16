import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ContactPage = lazy(() => import("../../../components/Web/Contact"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Contact(props: any) {
  const { location } = props;
  const goBack = useHistory().goBack;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      window.scrollTo(0, 0);  
    }
    return () => { unmounted = true };
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={goBack} eventGoBack="contacto" />
      <ContactPage />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        extra="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
