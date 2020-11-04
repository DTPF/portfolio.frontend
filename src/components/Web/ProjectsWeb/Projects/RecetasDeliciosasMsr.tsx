import React from "react";
import ProjectLayout from "../ProjectLayout";
import recetasDeliciosasImage from "../../../../assets/img/jpg/recetasmsr.jpg";

export default function RecetasDeliciosasMsr(props: any) {
  const { align, innerWidth } = props;
  return (
    <ProjectLayout
      innerWidth={innerWidth}
      align={align}
      link="https://www.recetasmsr.com"
      imageAlt="Link a www.recetasmsr.com"
      image={recetasDeliciosasImage}
      contentTitle="Recetas Deliciosas MSR's"
      contentText="Recetas Deliciosas MSR's es un blog de recetas de cocina, creado
      para agrupar todas las recetas familiares en un solo sitio. App
      Web personal de acceso público para usuarios previamente
      resgistrados con email verificado. CRUD completo para la gestión
      de contenido y usuarios."
      //   Recetas Deliciosas MSR's es un blog de recetas de cocina,
      //   creado para agrupar todas las recetas familiares en un solo
      //   sitio. Dispone de sistema de registro y verificación de
      //   usuarios, además de diferentes roles de usuario.
      //   El usuario básico, previamente registrado y verificado
      //   por email, puede buscar, visualizar y compartir las recetas.
    />
  );
}
