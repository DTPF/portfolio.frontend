import React, { useEffect, Suspense, lazy } from "react";
import "./AboutMe.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const CommingSoon = lazy(() => import("../../../components/UI/CommingSoon"));

export default function AboutMe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Sobre Mi"
        contentHelmet="Página sobre David Thomas Pizarro Frick"
      />
      <div className="about-me">
        <h1 className="about-me__title">Sobre Mi</h1>
        <CommingSoon />
      </div>
    </Suspense>
  );
}
