import React from "react";
import { Helmet } from "react-helmet";

export default function AboutMe() {
  return (
    <>
      <Helmet>
        <title>Sobre Mi | Página de contacto</title>
        <meta
          name="description"
          content="Contacto | David Thomas Pizarro Frick"
          data-react-helmet="true"
        />
      </Helmet>
      <div>
        <h1>Sobre Mi</h1>
      </div>
    </>
  );
}
