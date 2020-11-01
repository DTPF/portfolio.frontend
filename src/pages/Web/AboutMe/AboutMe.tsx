import React, { useEffect, Suspense, lazy } from "react";
const HelmetAnalytics = lazy(
  () => import("../../../components/HelmetAnalytics")
);
const AboutMeWeb = lazy(() => import("../../../components/Web/AboutMeWeb"));

export default function AboutMe(props: any) {
  const { location } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Sobre Mi"
        contentHelmet="Página sobre David Thomas Pizarro Frick"
      />
      <AboutMeWeb location={location} />
    </Suspense>
  );
}
