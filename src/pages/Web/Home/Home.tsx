import React, { useEffect, Suspense, lazy } from "react";
import { Row } from "antd";
import { Helmet } from "react-helmet";
import "./Home.scss";
const WellcomeParagraph = lazy(() => import("../../../components/Web/WellcomeParagraph/WellcomeParagraph"))
const MainTitle = lazy(() => import("../../../components/Web/MainTitle"));
const CategoriesBigButtons = lazy(() => import("../../../components/Web/CategoriesBigButtons"));

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Inicio | Página principal</title>
        <meta
          name="description"
          content="Página principal de David Thomas Pizarro Frick"
          data-react-helmet="true"
        />
      </Helmet>
      <Row className="home">
        <Suspense fallback={<></>}>
          <MainTitle />
          <WellcomeParagraph />
          <CategoriesBigButtons />
        </Suspense>
      </Row>
    </>
  );
}
