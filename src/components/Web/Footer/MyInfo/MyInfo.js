import React from "react";
import LogoWhite from "../../../../assets/img/png/logo-black.png";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="David Thomas Pizarro Frick" />
      <h4>
          Mi pasión por la vida sólo es superada por mi pasión y devoción por el software.
      </h4>
      <SocialLinks />
    </div>
  );
}
