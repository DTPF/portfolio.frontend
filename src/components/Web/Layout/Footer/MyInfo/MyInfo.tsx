import React from "react";
import Logo from "../../../../../assets/img/png/logo256.png";
import SocialLinks from "../../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={Logo} alt="Logo de DTPF" />
      <p>
          Mi afición al Hardware nace de mi devoción por el Software
      </p>
      <SocialLinks />
    </div>
  );
}
