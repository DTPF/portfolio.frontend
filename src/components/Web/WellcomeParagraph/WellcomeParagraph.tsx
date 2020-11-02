import React from "react";
import { Col } from "antd";
import "./WellcomeParagraph.scss";

export default function WellcomeParagraph() {
  return (
    <Col span={24} className="wellcome-paragraph">
      <p className="wellcome-paragraph__text">
        <span>Hola</span>, ¡Bienvenido a mi portfolio! Esta web la he creado
        para seguir complementando mis estudios y estar más cerca de convertirme
        en lo que toda empresa tecnológica necesita. Además de darme a conocer,
        quiero demostrar mis conocimientos con el objetivo de
        trabajar, aprender y crecer con tu equipo.
      </p>
    </Col>
  );
}
