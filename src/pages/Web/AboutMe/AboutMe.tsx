import React, { Suspense, lazy } from "react";
const HelmetAnalytics = lazy(
  () => import("../../../components/HelmetAnalytics")
);
const AboutMeWeb = lazy(() => import("../../../components/Web/AboutMeWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(
  () =>
    import(
      "../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"
    )
);

export default function AboutMe(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Sobre Mi"
        contentHelmet="Página sobre David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="sobre-mi" />
      <AboutMeWeb />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        classnameToHideComponent="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
