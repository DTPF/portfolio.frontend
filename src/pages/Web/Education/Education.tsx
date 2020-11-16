import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
import "./Education.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const EducationWeb = lazy(() => import("../../../components/Web/Education"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Education(props: any) {
  const { location, history } = props;
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
        titleHelmet="DTPF | Formación IT"
        contentHelmet="Página de Formación en tecnologías de la información"
      />
      <ButtonGoBack goBack={goBack}  eventGoBack="formacion" />
      <EducationWeb location={location} history={history} />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        extra="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
