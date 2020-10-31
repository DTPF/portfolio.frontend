import React, { useEffect, Suspense, lazy } from "react";
import "./Projects.scss";
const HelmetAnalytics = lazy(
  () => import("../../../components/HelmetAnalytics")
);
const CommingSoon = lazy(() => import("../../../components/UI/CommingSoon"));

export default function Projects() {
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
        <div className="projects">
          <h1 className="projects__title">Proyectos</h1>
          <CommingSoon />
        </div>
      </Suspense>
    </>
  );
}
