import React from "react";
import { Helmet } from "react-helmet";
import MainTitle from "../../components/Web/MainTitle";
import HomeCourses from "../../components/Web/HomeCourses";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Página principal</title>
        <meta
          name="description"
          content="Página principal"
          data-react-helmet="true"
        />
      </Helmet>
      <MainTitle />
      <HomeCourses />
    </>
  );
}
