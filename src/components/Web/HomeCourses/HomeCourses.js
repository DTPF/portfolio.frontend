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
    <>
      <Col span={24} className="home-courses__title" key="title">
        <QueueAnim type={["alpha"]} duration={400} ease="easeInSine">
          <h2 key="title">Últimos cursos</h2>
        </QueueAnim>
        <QueueAnim type={["alpha"]} duration={600} ease="easeInSine">
          <p key="subtitle">Últimos cursos que he realizado para mi preparación en el mundo de IT</p>
        </QueueAnim>
      </Col>
    <QueueAnim type={["alpha"]} duration={900} ease="easeInSine">
      <Row className="home-courses" key="cards">
        <Col lg={1} />
        <Col lg={22}>
            <Row className="row-courses" key="courses">
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={mern}
                  subtitle="Curso JavaScript Full Stack MERN (MongoDB, Express, React y Node)"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={angularReactVue}
                  subtitle="Master en Framewors de JavaScript: Angular, React y Vue"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={nodeSymfonyLaravAng}
                  subtitle="Curso desarrollo web Fullstack: Node.js, Symfony 5, Laravel 7 y Angular 10"
                />
              </Col>
              <Col span={12} md={8} lg={8} xl={6}>
                <CardCourse
                  image={javaScript}
                  subtitle="JavaScript de cero a los detalles (ES5)"
                />
              </Col>
            </Row>
        </Col>
        <Col lg={1} />
        <Row className="home-courses__more">
          <Col span={24}>
            <Link to="/education">
              <Button>Ver todos</Button>
            </Link>
          </Col>
        </Row>
      </Row>
    </QueueAnim>
    </>
  );
}

function CardCourse(props) {
  const { image, title, subtitle } = props;
  const { Meta } = Card;

  return (
    <Link to="/education">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} type="image/webp" />}
      >
        <Meta description={subtitle} />
      </Card>
    </Link>
  );
}