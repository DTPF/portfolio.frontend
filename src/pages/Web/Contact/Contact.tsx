import React, { Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../../components/Helmet"));
const ContactPage = lazy(() => import("../../../components/Web/Contact"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const MainMenuBigButtons = lazy(() => import("../../../components/Web/MainMenuBigButtons"));

export default function Contact(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="contacto" />
      <ContactPage />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  );
}
