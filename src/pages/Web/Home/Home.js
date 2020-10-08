import React, { useState, useEffect, Suspense, lazy } from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCoursesApi } from "../../../api/education";
import QueueAnim from "rc-queue-anim";
import "./Home.scss";
const MainTitle = lazy(() => import("../../../components/Web/MainTitle"));
const Courses = lazy(() => import("../../../components/Web/Education/Courses"));

export default function Home(props) {
  const [courses, setCourses] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const title = "Últimos cursos";
  const subtitle =
    "Últimos cursos que he realizado para" + 
    " mi preparación al mundo de IT";
  useEffect(() => {
    let unmounted = false;
    getCoursesApi(4, 1).then((response) => {
      if (!unmounted) {
        setCourses(response.courses);
      }
    });
    setImageLoaded(false);
    return () => {unmounted = true};
  }, []);
  window.scrollTo(0, 0);
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
      <Suspense fallback={<></>}>
        <MainTitle />
          <Row>
            <Col span={24} key="courses">
              <Courses
                numItems={4}
                title={title}
                subtitle={subtitle}
                courses={courses && courses.docs}
                setImageLoaded={setImageLoaded}
              />
              {imageLoaded && (
                <QueueAnim
                  type={["alpha"]}
                  delay={200}
                  duration={200}
                  ease="easeInOutCubic"
                >
                  <div className="home__more" key="button">
                    <Link to="/education">
                      <Button>Ver todos</Button>
                    </Link>
                  </div>
                </QueueAnim>
              )}
            </Col>
          </Row>
        </Suspense>
    </>
  );
}
