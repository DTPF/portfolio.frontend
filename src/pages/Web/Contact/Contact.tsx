import React, { Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../../components/Helmet"));
const ContactPage = lazy(() => import("../../../components/Web/Contact"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

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
      <CategoriesBigButtonsStatic
        location={location.pathname}
        classnameToHideComponent="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
