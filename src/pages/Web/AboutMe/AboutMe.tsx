import React, { useEffect, Suspense, lazy } from "react";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));

export default function AboutMe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Suspense fallback={<></>}>
        <HelmetAnalytics
          titleHelmet="DTPF | Sobre Mi"
          contentHelmet="Página para contactar con David Thomas Pizarro Frick"
        />
      </Suspense>
      <div>
        <h1>Sobre Mi</h1>
      </div>
    </>
  );
}
