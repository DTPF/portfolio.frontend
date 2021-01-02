import React, { Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../../components/Helmet"));
const AboutMeWeb = lazy(() => import("../../../components/Web/AboutMeWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const MainMenuBigButtons = lazy(() => import("../../../components/Web/MainMenuBigButtons"));

export default function AboutMe(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Sobre Mi"
        contentHelmet="Página sobre David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="sobre-mi" />
      <AboutMeWeb />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  );
}
