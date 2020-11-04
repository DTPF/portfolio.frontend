import React, { useState } from "react";
import "./ProjectsWeb.scss";
import RecetasDeliciosasMsr from "./Projects/RecetasDeliciosasMsr";
import PortfolioDTPF from "./Projects/PortfolioDTPF";
import CategoriesBigButtons from "../CategoriesBigButtons/CategoriesBigButtons";

export default function ProjectsWeb(props: any) {
  const { location } = props;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  function reportWindowSize() {
    setInnerWidth(window.innerWidth);
  }
  window.onresize = reportWindowSize;
  return (
    <div className="projects-web">
      <h1 className="projects-web__title">Proyectos</h1>
      <PortfolioDTPF innerWidth={innerWidth} align="left" />
      <RecetasDeliciosasMsr innerWidth={innerWidth} align="right" />
      <CategoriesBigButtons
        location={location.pathname}
        extra="categories-big-buttons__extra"
      />
    </div>
  );
}
