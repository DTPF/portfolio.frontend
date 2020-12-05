import React, { useEffect, Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../../components/Helmet"));
const ProjectsWeb = lazy(() => import("../../../components/Web/ProjectsWeb"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Projects(props: any) {
  const { location, history } = props;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      window.scrollTo(0, 0);
    }
    return () => { unmounted = true };
  }, []);
  return (
    <Suspense fallback={<></>}>
      <Helmet
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
