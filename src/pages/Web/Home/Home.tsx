import React from "react";
import WellcomeParagraph from "../../../components/Web/WellcomeParagraph/WellcomeParagraph";
import MainTitle from "../../../components/Web/MainTitle";
import CategoriesBigButtonsStatic from "../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic";
import Helmet from "../../../components/Helmet";
import { Row } from "antd";
import "./Home.scss";

export default function Home() { 
  return (
    <>
      <Helmet
        titleHelmet="DTPF | Página principal"
        contentHelmet="Página principal de David Thomas Pizarro Frick"
      />
      <Row className="home">
          <MainTitle />
          <WellcomeParagraph />
          <CategoriesBigButtonsStatic />
      </Row>
    </>
  );
}
