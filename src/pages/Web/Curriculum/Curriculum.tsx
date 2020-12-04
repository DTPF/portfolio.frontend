import React, { Suspense, lazy } from "react";
import "./Curriculum.scss";
const HelmetAnalytics = lazy(
  () => import("../../../components/HelmetAnalytics")
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
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
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
