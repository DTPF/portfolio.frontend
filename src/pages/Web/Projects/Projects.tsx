import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ProjectsWeb = lazy(() => import("../../../components/Web/ProjectsWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Projects(props: any) {
  const { location } = props;
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
        titleHelmet="DTPF | Proyectos"
        contentHelmet="Página de proyectos realizados por David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={goBack} eventGoBack="proyectos" />
      <ProjectsWeb />
      <CategoriesBigButtonsStatic
        location={location.pathname}
        extra="categories-big-buttons-static__extra"
      />
    </Suspense>
  );
}
