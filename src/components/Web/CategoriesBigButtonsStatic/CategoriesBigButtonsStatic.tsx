import React from "react";
import { Link } from "react-router-dom";
import useConnection from "../../../hooks/useConnection";
import { Row, Col } from "antd";
import "./CategoriesBigButtonsStatic.scss";

export default function CategoriesBigButtonsStatic(props: any) {
  const { location, extra } = props;
  const { isOnline } = useConnection();
  const classname: string = location ? location.split("/")[1] : "";
  return (
    <Row className={`categories-big-buttons-static ${isOnline ? extra : ""}`}>
      {classname === "education" ? (<></>) : <FormacionIT />}
      {classname === "curriculum" ? (<></>) : <Curriculum />}
      {classname === "projects" ? (<></>) : <Proyectos />}
      {classname === "about-me" ? (<></>) : <SobreMi />}
      {classname === "contact" ? (<></>) : <Contacto />}    
    </Row>
  );
}

function FormacionIT() {
  return (
    <Col span={24} md={11} className="education">
      <Link to="/education">
        <h1>Formación</h1>
        <p>Desde que decidí introducirme en este mundo</p>
      </Link>
    </Col>
  );
}

function Curriculum() {
  return (
    <Col span={24} md={11} className="curriculum">
      <Link to="/curriculum">
        <h1>Currículum</h1>
        <p>Trayectoria profesional</p>
      </Link>
    </Col>
  );
}

function Proyectos() {
  return (
    <Col span={24} md={11} className="projects">
      <Link to="/projects">
        <h1>Proyectos</h1>
        <p>Aún son pocos, pero crecerán</p>
      </Link>
    </Col>
  );
}

function SobreMi() {
  return (
    <Col span={24} md={11} className="about-me">
      <Link to="/about-me">
        <h1>Sobre Mi</h1>
        <p>Para que me puedas conocer mejor</p>
      </Link>
    </Col>
  );
}

function Contacto() {
  return (
    <Col span={24} md={11} className="contact">
      <Link to="/contact">
        <h1>Contacto</h1>
        <p>¿Hablamos?</p>
      </Link>
    </Col>
  );
}
