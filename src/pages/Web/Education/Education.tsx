import React, { Suspense, lazy } from "react";
import "./Education.scss";
const Helmet = lazy(() => import("../../../components/Helmet"));
const EducationWeb = lazy(() => import("../../../components/Web/Education"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const MainMenuBigButtons = lazy(() => import("../../../components/Web/MainMenuBigButtons"));

export default function Education(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Formación IT"
        contentHelmet="Página de Formación en tecnologías de la información"
      />
      <ButtonGoBack goBack={history.goBack}  eventGoBack="formacion" />
      <EducationWeb location={location} history={history} />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  );
}
