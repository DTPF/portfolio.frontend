import React, { Suspense, lazy } from "react";
import "./Curriculum.scss";
const Helmet = lazy(() => import("../../../components/Helmet"));
const CurriculumWeb = lazy(() => import("../../../components/Web/Curriculum"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const MainMenuBigButtons = lazy(() => import("../../../components/Web/MainMenuBigButtons"));

export default function Curriculum(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Curriculum"
        contentHelmet="Curriculum de David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="curriculum" />
      <CurriculumWeb />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  );
}
