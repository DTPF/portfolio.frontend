import React from "react";
import useScrollToTop from "../../../hooks/useScrollToTop";
import WellcomeParagraph from "../../../components/Web/WellcomeParagraph/WellcomeParagraph";
import MainTitle from "../../../components/Web/MainTitle";
import MainMenuBigButtons from "../../../components/Web/MainMenuBigButtons";
import Helmet from "../../../components/Helmet";
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
        <MainMenuBigButtons />
      </div>
    </>
  );
}
