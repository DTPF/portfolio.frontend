import React, { useEffect, Suspense, lazy } from "react";
import { useGetCourses } from "../../../hooks/useGetCourses";
import { useNearScreen } from "../../../hooks/useNearScreen";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Button, BackTop } from "antd";
import { Helmet } from "react-helmet";
import "./Education.scss";
const Pagination = lazy(() => import("../../../components/Pagination/Pagination"));
const Courses = lazy(() => import("../../../components/Web/Education/Courses"));
const CourseInfo = lazy(() => import("../../../components/Web/Education/CourseInfo"));
const InfoBanner = lazy(() => import("../../../components/Web/Education/InfoBanner"));

export default function Education({ location, history }) {
  const { url } = useParams();
  const [courses] = useGetCourses(100, location);
  const [show, el] = useNearScreen();
  const goBack = useHistory().goBack;
  const title = "Todos los cursos";
  const subtitle =
    "Todos los cursos que he realizado presenciales" +
    " y online para mi preparación al mundo de IT";
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
      <Helmet>
        <title>Formación | Mi formación en IT</title>
        <meta
          name="description"
          content="Mi formación en tecnologías de la información"
          data-react-helmet="true"
        />
      </Helmet>
      {!url ? (
        <Row className="education">
          <BackTop duration={800} />
          <Col lg={1} />
          <Col lg={22}>
            <div className="div"></div>
            <Col className="education__info-courses" key="courses">
              <Suspense fallback={<></>}>
                <InfoBanner />
                <Courses
                  numItems={10000}
                  title={title}
                  subtitle={subtitle}
                  courses={courses?.docs}
                  location={location}
                  history={history}
                />
              </Suspense>
            </Col>
            <div className="div"></div>
            {courses?.totalPages > 1 && (
              <>
                <Col key="pagination">
                  <Suspense fallback={<></>}>
                    <Pagination
                      courses={courses}
                      location={location}
                      history={history}
                    />
                  </Suspense>
                </Col>
              </>
            )}
            <div className="education__button" ref={el}>
              {show && (
                <Button type="primary" onClick={goBack}>
                  Volver
                </Button>
              )}
            </div>
            <div className="div"></div>
          </Col>
          <Col lg={1} />
        </Row>
      ) : (
        <Suspense fallback={<></>}>
          <Col key={url} ref={el}>
            <CourseInfo url={url} courses={courses} />
          </Col>
        </Suspense>
      )}
    </>
  );
}
