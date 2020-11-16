import React, { useState } from "react";
import ContactForm from "../../../components/Web/Contact/ContactForm";
import ContactInfo from "./ContactInfo/ContactInfo";
import { Image } from "antd";
import "./Contact.scss";
import desktopMapImage from "../../../assets/img/jpg/mapa-desktop-contacto.jpg";
import mobileMapImage from "../../../assets/img/jpg/mapa-mobile-contacto.jpg";

export default function Contact() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  function reportWindowSize() {
    setInnerWidth(window.innerWidth);
  }
  window.onresize = reportWindowSize;
  return (
    <div className="contact">
      <h1 className="contact__title">Contacto</h1>
      <ContactInfo innerWidth={innerWidth} />
      <ContactForm />
      {innerWidth <= 650 ? (
        <Image src={mobileMapImage} preview={false} />
      ) : (
        <Image src={desktopMapImage} preview={false} />
      )}
    </div>
  );
}
