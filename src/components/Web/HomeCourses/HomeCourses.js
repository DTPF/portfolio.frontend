import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import reactJsHooks from "../../../assets/img/nopush/react-js-hooks.jpg";
import reactNative from "../../../assets/img/nopush/react-native.jpg";
import javaScript from "../../../assets/img/nopush/javascript-es6.jpg";
import wordPress from "../../../assets/img/nopush/wordpress.jpg";
import QueueAnim from "rc-queue-anim";

import "./HomeCourses.scss";

export default function HomeCourses() {
  return (
    <QueueAnim type={["bottom", "top"]} ease={["easeInCubic"]} duration={400}>
      <Row className="home-courses" key="title">
        <Col span={24} className="home-courses__title">
          <h2>Últimos cursos realizados</h2>
        </Col>
        <Col lg={1} />
        <Col lg={22}>
          <QueueAnim type={["bottom", "top"]} ease={["easeInCubic"]} duration={600}>
            <Row className="row-courses" key="courses">
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={reactJsHooks}
                  title="React JS Hooks"
                  subtitle="Intermedio - React/JavaScript"
                  link="https://recetasmsr.com"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={reactNative}
                  title="React Native Expo"
                  subtitle="Intermedio - React/JavaScript"
                  link="https://recetasmsr.com"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={javaScript}
                  title="JavaScript ES6"
                  subtitle="Básico - JavaScript"
                  link="https://recetasmsr.com"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={wordPress}
                  title="WordPress"
                  subtitle="Básico - WordPress"
                  link="https://recetasmsr.com"
                />
              </Col>
            </Row>
          </QueueAnim>
        </Col>
        <Col lg={1} />
        <QueueAnim className="home-courses__more" type={["bottom", "top"]} ease={["easeInCubic"]} duration={800}>
        <Row key="seeMore">
          <Col span={24}>
            <Link to="/courses">
              <Button>Ver más</Button>
            </Link>
          </Col>
        </Row>
        </QueueAnim>
      </Row>
    </QueueAnim>
  );
}

function CardCourse(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>INGRESAR</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
