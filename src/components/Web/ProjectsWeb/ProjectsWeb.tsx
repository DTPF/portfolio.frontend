import React from "react";
import "./ProjectsWeb.scss";
import CommingSoon from "../../../components/UI/CommingSoon";
import CategoriesBigButtons from "../../../components/Web/CategoriesBigButtons";

export default function ProjectsWeb(props: any) {
  const { location } = props;
  return (
    <div className="projects">
      <h1 className="projects__title">Proyectos</h1>
      <CommingSoon />
      <CategoriesBigButtons
        location={location.pathname}
        extra="categories-big-buttons__extra"
      />
    </div>
  );
}
