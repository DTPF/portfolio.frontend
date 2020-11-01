import React, { useEffect, Suspense, lazy } from "react";
import "./Education.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const EducationWeb = lazy(() => import("../../../components/Web/Education"));

export default function Education(props: any) {
  const { location, history } = props;
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Formación IT"
        contentHelmet="Página de Formación en tecnologías de la información"
      />
      <EducationWeb location={location} history={history} />
    </Suspense>
  );
}
