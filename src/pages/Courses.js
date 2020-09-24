import React from "react";
import { Helmet } from "react-helmet";

export default function Courses() {
  return (
    <>
      <Helmet>
        <title>Cursos | Cursos realizados</title>
        <meta
          name="description"
          content="Cursos realizados"
          data-react-helmet="true"
        />
      </Helmet>
      <h1>Courses</h1>
    </>
  );
}
