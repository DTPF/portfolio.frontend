import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
import "./Education.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const EducationWeb = lazy(() => import("../../../components/Web/Education"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));

export default function Education(props: any) {
  const { location, history } = props;
  const goBack = useHistory().goBack;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Formación IT"
        contentHelmet="Página de Formación en tecnologías de la información"
      />
      <ButtonGoBack goBack={goBack}  eventGoBack="formacion" />
      <EducationWeb location={location} history={history} />
    </Suspense>
  );
}
