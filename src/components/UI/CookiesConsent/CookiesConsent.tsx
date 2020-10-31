import React from "react";
import { useHistory } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import gtag from "../../../utils/gtag";
import "./CookiesConsent.scss";

export default function CookiesConsent() {
  const history = useHistory();
  const accept = () => {
    gtag();
    history.go(0);
  };  
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar"
      cookieName="_gaCookies"
      
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={730}
      onAccept={() => accept()}
    >
      {`Ayúdame a mejorar tu experiencia con el uso de cookies alojadas en tu navegador :)`}
    </CookieConsent>
  );
}
