import React from "react";
import "./AboutMeWeb.scss";
import CommingSoon from "../../../components/UI/CommingSoon";

export default function AboutMeWeb() {
  return (
    <div className="about-me">
      <h1 className="about-me__title">Sobre Mi</h1>
      <CommingSoon />
    </div>
  );
}
