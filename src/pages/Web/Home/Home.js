import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCoursesApi } from "../../../api/education";
import MainTitle from "../../../components/Web/MainTitle";
import Courses from "../../../components/Web/Education/Courses";
import QueueAnim from "rc-queue-anim";
import { LoadingOutlined } from "@ant-design/icons";

import "./Home.scss";

export default function Home() {
  const [courses, setCourses] = useState(null);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    let unmounted = false;
    getCoursesApi(4, 1)
    .then((response) => {
          if (!unmounted) {
            setCourses(response.courses);
          }
      });
      window.scrollTo(0, 0);
      return () => {unmounted = true};
  }, []);

  const title = "Últimos cursos";
  const subtitle = "Últimos cursos que he realizado para" +
                    " mi preparación al mundo de IT";

  return (
    <>    
      <Helmet>
        <title>Inicio | Página principal</title>
        <meta
          name="description"
          content="Página principal de David Thomas Pizarro Frick"
          data-react-helmet="true"
        />
      </Helmet>
      <MainTitle />
      {!courses ? (
        <Spin
          indicator={antIcon}
          style={{
            textAlign: "center",
            width: "100%",
            height: "100%",
            padding: "20px",
            marginTop: "200px",
            color: "#5d718d",
          }}
        />
      ) : (
        <Row>
          <QueueAnim
            type={["alpha"]}
            duration={650}
            ease="easeInSine"
          >
            <Col span={24} key="courses">
              <Courses
                numItems={4}
                title={title}
                subtitle={subtitle}
                courses={courses.docs}
              />
            </Col>
            <Col span={24} className="home__more" key="button">
              <Link to="/education">
                <Button>Ver todos</Button>
              </Link>
            </Col>
          </QueueAnim>
        </Row>
      )}
    </>
  );
}
