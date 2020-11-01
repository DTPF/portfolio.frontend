import React from "react";
import "./AboutMeWeb.scss";
import CommingSoon from "../../../components/UI/CommingSoon";
import CategoriesBigButtons from "../../../components/Web/CategoriesBigButtons";

export default function AboutMeWeb(props: any) {
  const { location } = props;
  return (
    <div className="about-me">
      <h1 className="about-me__title">Sobre Mi</h1>
      <CommingSoon />
      <CategoriesBigButtons
        location={location.pathname}
        extra="categories-big-buttons__extra"
      />
    </div>
  );
}
