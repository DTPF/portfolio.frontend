import React, { useEffect, Suspense, lazy } from "react";
import { useGetCourses } from "../../../hooks/useGetCourses";
import { useNearScreen } from "../../../hooks/useNearScreen";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Home.scss";
const MainTitle = lazy(() => import("../../../components/Web/MainTitle"));
const Courses = lazy(() => import("../../../components/Web/Education/Courses"));
const BannerLastProject = lazy(
  () => import("../../../components/Web/BannerLastProject")
);

export default function Home() {
  const [courses] = useGetCourses(4, 1);
  const [show, el] = useNearScreen();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      <RenderContent courses={courses} el={el} show={show} />
    </>
  );
}

function RenderContent(props: { courses: any; el: any; show: any }) {
  const { courses, el, show } = props;
  const title = "Últimos cursos";
  const subtitle = `Últimos cursos que he realizado para mi preparación al mundo de IT`;
  return (
    <>
      <Suspense fallback={<></>}>
        <MainTitle />
        <BannerLastProject />
        <Row className="home" key="row">
          <Col span={24} className="home__courses" key="courses">
            <Courses
              numItems={4}
              title={title}
              subtitle={subtitle}
              courses={courses && courses.docs}
            />
          </Col>
        </Row>
        <div className="home__more" key="button" ref={el}>
          {show && (
            <Link to="/education">
              <Button className="home__more-button">Ver todos</Button>
            </Link>
          )}
        </div>
      </Suspense>
    </>
  );
}
