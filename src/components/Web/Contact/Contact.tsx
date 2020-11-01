import React from "react";
import "./Contact.scss";
import CommingSoon from "../../../components/UI/CommingSoon";
import CategoriesBigButtons from "../../../components/Web/CategoriesBigButtons";

export default function Contact(props: any) {
  const { location } = props;
  return (
    <div className="contact">
      <h1 className="contact__title">Contacto</h1>
      <CommingSoon />
      <CategoriesBigButtons
        location={location.pathname}
        extra="categories-big-buttons__extra"
      />
    </div>
  );
}
