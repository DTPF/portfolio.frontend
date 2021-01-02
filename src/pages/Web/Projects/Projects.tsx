import React, { Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../../components/Helmet"));
const ProjectsWeb = lazy(() => import("../../../components/Web/ProjectsWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const MainMenuBigButtons = lazy(() => import("../../../components/Web/MainMenuBigButtons"));

export default function Projects(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Proyectos"
        contentHelmet="Página de proyectos realizados por David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="proyectos" />
      <ProjectsWeb />
      <MainMenuBigButtons location={location.pathname} />
    </Suspense>
  );
}
