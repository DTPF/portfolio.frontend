import React from "react";
import { Row, Col, Image } from "antd";
import QueueAnim from "rc-queue-anim";
import RECETASMSR from "../../../assets/img/webp/recetasmsr.webp";
import { LinkOutlined } from "@ant-design/icons";
import "./BannerLastProject.scss";

export default function BannerLastProject() {
  return (
    <Row className="banner-last-project">
       <Col span={24} className="banner-last-project__title">
        <QueueAnim type={"alpha"} duration={200} ease="easeInCubic">
          <div key="title">
            <h1>Portfolio</h1>
          </div>
        </QueueAnim>
      </Col>
      <Col span={24} md={12} className="banner-last-project__image">
        <QueueAnim type={"alpha"} duration={250} ease="easeInCubic">
          <div key="image">
            <Image src={RECETASMSR}></Image>
          </div>
        </QueueAnim>
      </Col>
      <Col span={24} md={12} className="banner-last-project__content">
        <Col span={24} className="banner-last-project__content-title">
          <QueueAnim type={"alpha"} duration={300} ease="easeInCubic">
            <div key="titleh2">
              <h2>
                Recetas Deliciosas MSR's
                <a
                  href="https://recetasmsr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkOutlined />
                </a>
              </h2>
            </div>
          </QueueAnim>
        </Col>
        <Col span={24} className="banner-last-project__content-text">
          <QueueAnim type={"alpha"} duration={350} ease="easeInCubic">
            <div key="p">
              <p>
                Recetas Deliciosas MSR's es un blog de recetas de cocina, creado
                para agrupar todas las recetas familiares en un solo sitio. App
                Web personal de acceso público para usuarios previamente
                resgistrados con email verificado. CRUD completo para la gestión
                de contenido y usuarios.
                <span>PHP | Laravel | HTML5 | CSS3 | JS</span>
                {/* Recetas Deliciosas MSR's es un blog de recetas de cocina,
                creado para agrupar todas las recetas familiares en un solo
                sitio. Dispone de sistema de registro y verificación de
                usuarios, además de diferentes roles de usuario.
                El usuario básico, previamente registrado y verificado
                por email, puede buscar, visualizar y compartir las recetas. */}
              </p>
            </div>
          </QueueAnim>
        </Col>
      </Col>
    </Row>
  );
}