import React from "react";
import { Row, Col, Image } from "antd";
import QueueAnim from "rc-queue-anim";
import RECETASMSR from "../../../assets/img/webp/recetasmsr.webp";
import "./BannerLastProject.scss";

export default function BannerLastProject() {
  return (
    <>
      <Row className="banner-last-project">
        <Col span={24} className="banner-last-project__title">
          <QueueAnim type={["alpha"]} duration={200} ease="easeInCubic">
            <div key="title">
              <h1>Portfolio</h1>
            </div>
          </QueueAnim>
        </Col>
        <Col span={24} md={12} className="banner-last-project__image">
          <QueueAnim type={["alpha"]} duration={250} ease="easeInCubic">
            <div key="image">
              <Image src={RECETASMSR}></Image>
            </div>
          </QueueAnim>
        </Col>
        <Col span={24} md={12} className="banner-last-project__content">
          <Col span={24} className="banner-last-project__content-title">
            <QueueAnim type={["alpha"]} duration={300} ease="easeInCubic">
              <div key="titleh2">
                <h2>Blog de recetas</h2>
              </div>
            </QueueAnim>
          </Col>
          <Col span={24} className="banner-last-project__content-link">
            <QueueAnim type={["alpha"]} duration={400} ease="easeInCubic">
              <div key="a">
                <a
                  href="https://recetasmsr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://recetasmsr.com
                </a>
              </div>
            </QueueAnim>
          </Col>
          <Col span={24} className="banner-last-project__content-text">
            <QueueAnim type={["alpha"]} duration={350} ease="easeInCubic">
              <div key="p">
                <p>
                  Lorem ipsum ipm dolor est Lorem sum dolor t Lorem ipsum drem
                  ium dolor est Lorem ipsum dolor est Lorem ipsum lor est Loi
                  dol est Lo ipsum dolor est Lorem ipsum dolor est Lorem ipsum
                  dolor est Lorem ipsum dolor est Lorem ipsum ipm dolor est
                  Lorem sum dolor t Lorem ipsum drem
                </p>
              </div>
            </QueueAnim>
          </Col>
        </Col>
      </Row>
    </>
  );
}
