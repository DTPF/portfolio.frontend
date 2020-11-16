import React, { useState } from "react";
import "./ProjectsWeb.scss";
import RecetasDeliciosasMsr from "./Projects/RecetasDeliciosasMsr";
import PortfolioDTPF from "./Projects/PortfolioDTPF";

export default function ProjectsWeb() {
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
    </div>
  );
}
