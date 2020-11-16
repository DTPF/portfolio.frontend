import React, { useEffect, Suspense, lazy } from "react";
import { Row } from "antd";
import "./Home.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const WellcomeParagraph = lazy(() => import("../../../components/Web/WellcomeParagraph/WellcomeParagraph"))
const MainTitle = lazy(() => import("../../../components/Web/MainTitle"));
const CategoriesBigButtonsStatic = lazy(() => import("../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic"));

export default function Home() {
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
        titleHelmet="DTPF | Página principal"
        contentHelmet="Página principal de David Thomas Pizarro Frick"
      />
      <Row className="home">
          <MainTitle />
          <WellcomeParagraph />
          <CategoriesBigButtonsStatic />
      </Row>
    </Suspense>
  );
}
