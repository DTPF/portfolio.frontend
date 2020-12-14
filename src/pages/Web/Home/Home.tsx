import React from "react";
import WellcomeParagraph from "../../../components/Web/WellcomeParagraph/WellcomeParagraph";
import MainTitle from "../../../components/Web/MainTitle";
import CategoriesBigButtonsStatic from "../../../components/Web/CategoriesBigButtonsStatic/CategoriesBigButtonsStatic";
import Helmet from "../../../components/Helmet";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./Home.scss";

export default function Home() {
  useScrollToTop();
  return (
    <>
      <Helmet
        titleHelmet="DTPF | Página principal"
        contentHelmet="Página principal de David Thomas Pizarro Frick"
      />
      <div className="home">
        <MainTitle />
        <WellcomeParagraph />
        <CategoriesBigButtonsStatic />
      </div>
    </>
  );
}
