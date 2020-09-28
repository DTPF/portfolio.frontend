import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import mern from "../../../assets/img/webp/mongo-node-express-react.webp";
import angularReactVue from "../../../assets/img/webp/angular-react-vue.webp";
import javaScript from "../../../assets/img/webp/javascript.webp";
import nodeSymfonyLaravAng from '../../../assets/img/webp/node-symfony-laravel-angular.webp';
import QueueAnim from "rc-queue-anim";

import "./HomeCourses.scss";

export default function HomeCourses() {
  return (
    <QueueAnim type={["scaleY"]} ease={["easeOutSine"]} duration={500}>
      <Row className="home-courses" key="title">
        <Col span={24} className="home-courses__title">
          <h2>Últimos cursos realizados</h2>
        </Col>
        <Col lg={1} />
        <Col lg={22}>
            <Row className="row-courses" key="courses">
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={mern}
                  subtitle="Curso JavaScript Full Stack MERN (MongoDB, Express, React y Node)"
                  link="https://recetasmsr.com"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={angularReactVue}
                  subtitle="Máster en Framewors de JavaScript: Angular, React y Vue"
                  link="https://recetasmsr.com"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={nodeSymfonyLaravAng}
                  subtitle="Curso desarrollo web Fullstack: Node.js, Symfony 5, Laravel 7 y Angular 10"
                  link="https://recetasmsr.com"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={javaScript}
                  subtitle="JavaScript de cero a los detalles (ES5)"
                  link="https://recetasmsr.com"
                />
              </Col>
            </Row>
        </Col>
        <Col lg={1} />
        <Row className="home-courses__more" key="seeMore">
          <Col span={24}>
            <Link to="/courses">
              <Button>Ver todos</Button>
            </Link>
          </Col>
        </Row>
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
        cover={<img src={image} alt={title} type="image/webp" />}
      >
        <Meta description={subtitle} />
      </Card>
    </a>
  );
}
