import React from "react";
import ProjectLayout from "../ProjectLayout";
import PortfolioDTPFImage from "../../../../assets/img/jpg/dtpf.jpg";

export default function PortfolioDTPF(props: any) {
  const { align, innerWidth } = props;
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      link="https://dtpf.es"
      imageAlt="Link a https://www.dtpf.es"
      image={PortfolioDTPFImage}
      contentTitle="Portfolio DTPF"
      contentText="Mi último proyecto es mi portfolio, realizado
      partiendo de un conocimiento adquirido en un curso online
      impartido por Agustín Navarro Galdón. Aplicación web SPA
      full javascript, con panel de administrador, CMS propio, 
      SEO optimizado, Google Analytics y muchas cosas más."
    />
  );
}
