import React, { useEffect, Suspense, lazy } from "react";
import "./Curriculum.scss";
const Helmet = lazy(
  () => import("../../../components/Helmet")
);
const CurriculumWeb = lazy(() => import("../../../components/Web/Curriculum"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(
  () =>
    import(
      "../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"
    )
);

export default function Curriculum(props: any) {
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
        titleHelmet="DTPF | Curriculum"
        contentHelmet="Curriculum de David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="curriculum" />
      <CurriculumWeb />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        classnameToHideComponent="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
