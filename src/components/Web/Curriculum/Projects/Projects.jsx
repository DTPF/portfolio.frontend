import React from "react";
import { useNearScreen } from "../../../../hooks/useNearScreen";
import { Row, Col, Image } from "antd";
import { Link } from "react-router-dom";
import dtpfImage from "../../../../assets/img/webp/project-dtpf.webp";
import recetasImage from "../../../../assets/img/webp/project-recetas.webp";
import "./Projects.scss";

export default function Projects() {
  const [show, el] = useNearScreen();
  return (
    <div className="projects">
      <div className="use-near-screen" ref={el}>
        {show && (
          <>
            <h2>Proyectos</h2>
            <Row>
              <Col span={12}>
                <h3>Portfolio personal</h3>
                <Image src={dtpfImage}></Image>
                <Link to="/">https://dtps.es</Link>
              </Col>
              <Col span={12}>
                <h3>Blog de recetas</h3>
                <Image src={recetasImage}></Image>
                <a
                  href="https://recetasmsr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://recetasmsr.com
                </a>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}