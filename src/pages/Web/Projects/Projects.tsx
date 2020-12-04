import React, { Suspense, lazy } from "react";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ProjectsWeb = lazy(() => import("../../../components/Web/ProjectsWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Projects(props: any) {
  const { location, history } = props;
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Proyectos"
        contentHelmet="Página de proyectos realizados por David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="proyectos" />
      <ProjectsWeb />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        classnameToHideComponent="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
