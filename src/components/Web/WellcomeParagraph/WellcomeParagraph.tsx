import React from "react";
import { Col } from "antd";
import "./WellcomeParagraph.scss";

export default function WellcomeParagraph() {
  return (
    <Col span={24} className="wellcome-paragraph">
      {/* <p className="categories-big-buttons__text">
          <span>Hola</span>, ¡Bienvenido a mi portfolio! Esta web la he creado
          al terminar mis estudios, al no poder haber hecho prácticas laborales
          y no tener experiencia debido a la situación actual. Con ella, además
          de darme a conocer, quiero demostrar algunos de mis conocimientos con
          el objetivo de trabajar, aprender y crecer con tu equipo.
        </p> */}
      <p className="wellcome-paragraph__text">
        <span>Hola</span>, ¡Bienvenido a mi portfolio! Esta web la he creado
        para seguir complementando mis estudios, y para estar más cerca de
        convertirme en lo que toda empresa tecnológica necesita. Con ella,
        además de darme a conocer, quiero demostrar algunos de mis conocimientos
        con el objetivo de trabajar, aprender y crecer con tu equipo.
      </p>
    </Col>
  );
}
