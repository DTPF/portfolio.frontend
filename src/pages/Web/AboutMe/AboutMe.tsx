import React, { useEffect, Suspense, lazy } from "react";
const Helmet = lazy(
  () => import("../../../components/Helmet")
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
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      window.scrollTo(0, 0);
    }
    return () => { unmounted = true };
  }, []);
  return (
    <Suspense fallback={<></>}>
      <Helmet
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
