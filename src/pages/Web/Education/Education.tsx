import React, { Suspense, lazy } from "react";
import "./Education.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const EducationWeb = lazy(() => import("../../../components/Web/Education"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Education(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Formación IT"
        contentHelmet="Página de Formación en tecnologías de la información"
      />
      <ButtonGoBack goBack={history.goBack}  eventGoBack="formacion" />
      <EducationWeb location={location} history={history} />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        classnameToHideComponent="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
