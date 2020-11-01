import React, { useEffect, Suspense, lazy } from "react";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const ProjectsWeb = lazy(() => import("../../../components/Web/ProjectsWeb"));

export default function Projects(props: any) {
  const { location } = props;
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
        <ProjectsWeb location={location} />
      </Suspense>
    </>
  );
}
