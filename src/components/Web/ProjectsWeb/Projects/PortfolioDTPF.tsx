import React from "react";
import ProjectLayout from "../ProjectLayout";
import PortfolioDTPFImage from "../../../../assets/img/jpg/dtpf.jpg";
import ModalImage1 from "../../../../assets/img/jpg/dtpfModalImage1.jpg";
import ModalImage2 from "../../../../assets/img/jpg/dtpfModalImage2.jpg";
import ModalImage3 from "../../../../assets/img/jpg/dtpfModalImage3.jpg";

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
      partiendo de un conocimiento adquirido en un curso online.
      Aplicación web SPA full Javascript, con panel de administrador,
      CMS propio, SEO optimizado, Google Analytics entre otras cosas."
      modalTitle="Portfolio David Thomas Pizarro Frick"
      modalImage1={ModalImage1}
      modalImage2={ModalImage2}
      modalImage3={ModalImage3}
      modalImageAlt="Imágen de www.dtpf.es"
      modalDate="En desarrollo"
      modalIntroduction="
        Mi portfolio es un proyecto que tiene como objetivo darme a 
        conocer, un registro de lo que he hecho hasta ahora y una muestra
        de lo que soy capaz de hacer. Este proyecto parte de un conocimiento
        adquirido en un curso y posteriormente he seguido realizando cursos 
        en diferentes plataformas, me he formado con las documentaciones
        oficiales de las tecnologías utilizadas y en foros especializados.
      "
      modalText={[
        `Utilizo NodeJS para el back-end junto con Express para la infraestructura
        API de la aplicación. MongoDB como sistema de base de datos y Mongoose 
        para la definición de objetos mediante esquemas tipados.`,
        `Para el front-end SPA utilizo React con una arquitectura Flux, desarrollada
        para un rendimiento óptimo combiando el componente Suspense de React para
        la carga de componentes en demanda, la API de Intersection Observer para
        carga de contenido en demanda y mantengo la UI de usuarios comunes separada
        del administrador. Para la navegación en la web hago uso de React Router.
        React Helmet para la gestión de las cabeceras de la web. Utilizo Socket.io
        para las notificaciones de los mensajes recibidos del formulario de
        contacto de la web en el panel de administrador. He empleado el framework
        Ant Design para el diseño, y SASS para los estilos. Los test se realizan
        con Jest, que cubren todas las llamadas API del front-END. Empleo Google
        Analytics gtag con eventos personalizados en la aplicación para mejorar 
        la experiencia de usuario.`
      ]}
      modalTags={[
        "NodeJS",
        "Express",
        "JWT",
        "MongoDB",
        "Mongoose",
        "React",
        "JavaScript",
        "TypeScript",
        "JSX",
        "SASS",
        "Ant Design",
        "Socket.io",
        "Helmet",
        "Google Analytics",
      ]}
    />
  );
}
