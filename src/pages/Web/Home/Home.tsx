import React, { useEffect, Suspense, lazy } from "react";
import { Row } from "antd";
import "./Home.scss";
const WellcomeParagraph = lazy(() => import("../../../components/Web/WellcomeParagraph/WellcomeParagraph"))
const MainTitle = lazy(() => import("../../../components/Web/MainTitle"));
const CategoriesBigButtons = lazy(() => import("../../../components/Web/CategoriesBigButtons"));
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
          <CategoriesBigButtons />
      </Row>
    </Suspense>
  );
}
