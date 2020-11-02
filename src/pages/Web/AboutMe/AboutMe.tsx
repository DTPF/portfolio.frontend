import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(
  () => import("../../../components/HelmetAnalytics")
);
const AboutMeWeb = lazy(() => import("../../../components/Web/AboutMeWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));

export default function AboutMe(props: any) {
  const { location } = props;
  const goBack = useHistory().goBack;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Sobre Mi"
        contentHelmet="Página sobre David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={goBack} eventGoBack="sobre-mi" />
      <AboutMeWeb location={location} />
    </Suspense>
  );
}
