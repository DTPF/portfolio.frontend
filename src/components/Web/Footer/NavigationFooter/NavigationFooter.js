import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  HomeOutlined,
  CoffeeOutlined,
  ToolOutlined,
  ContactsOutlined
} from "@ant-design/icons";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col span={24}>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <Link to="/">
          <HomeOutlined />
          Home
        </Link>
      </li>
      <li>
        <Link to="/about-me">
        <ContactsOutlined />
          Sobre Mi
        </Link>
      </li>
      <li>
        <Link to="/courses">
          <BookOutlined />
          Cursos
        </Link>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <Link to="/experience">
          <ToolOutlined />
          Experiencia
        </Link>
      </li>
      <li>
        <Link to="/contact">
          <BookOutlined />
          Contacto
        </Link>
      </li>
      <li>
        <a
          href="https://recetasmsr.com"
          target="blank"
          rel="noopener noreferrer"
          alt="Blog de Recetas"
        >
          <CoffeeOutlined />
          Recetas Msr
        </a>
      </li>
    </ul>
  );
}
