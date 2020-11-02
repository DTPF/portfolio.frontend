import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ProjectsWeb = lazy(() => import("../../../components/Web/ProjectsWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));

export default function Projects(props: any) {
  const { location } = props;
  const goBack = useHistory().goBack;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Suspense fallback={<></>}>
        <HelmetAnalytics
          titleHelmet="DTPF | Proyectos"
          contentHelmet="Página de proyectos realizados por David Thomas Pizarro Frick"
        />
        <ButtonGoBack goBack={goBack} eventGoBack="proyectos" />
        <ProjectsWeb location={location} />
      </Suspense>
    </>
  );
}
