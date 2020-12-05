import React, { useEffect, Suspense, lazy } from "react";
import "./Education.scss";
const Helmet = lazy(() => import("../../../components/Helmet"));
const EducationWeb = lazy(() => import("../../../components/Web/Education"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Education(props: any) {
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
