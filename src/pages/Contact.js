import React from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contacto | Página de contacto</title>
        <meta
          name="description"
          content="Contacto | David Thomas Pizarro Frick"
          data-react-helmet="true"
        />
      </Helmet>
      <div>
        <h1>Estamos en Contact</h1>
      </div>
    </>
  );
}
