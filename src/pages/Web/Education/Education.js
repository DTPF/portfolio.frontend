import React, { useState, useEffect, Suspense, lazy } from "react";
import { Row, Col, Button, BackTop } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCoursesApi } from "../../../api/education";
import queryString from "query-string";
import QueueAnim from "rc-queue-anim";
import "./Education.scss";
const Pagination = lazy(() => import("../../../components/Pagination/Pagination"));
const Courses = lazy(() => import("../../../components/Web/Education/Courses"));
const CourseInfo = lazy(() => import("../../../components/Web/Education/CourseInfo"));
const InfoBanner = lazy(() => import("../../../components/Web/Education/InfoBanner"));

export default function Education(props) {
  const { location, history } = props;
  const { url } = useParams();
  const [courses, setCourses] = useState(null);
  const goBack = useHistory().goBack;
  // eslint-disable-next-line no-unused-vars
  const { page = 1 } = queryString.parse(location.search);
  useEffect(() => {
    let unmounted = false;
    getCoursesApi(20, page).then((response) => {
      if (!unmounted) {
        setCourses(response.courses);
      }
    });
    window.scrollTo(0, 0);
    return () => { unmounted = true };
  }, [page]);
  const title = "Todos los cursos";
  const subtitle =
    "Todos los cursos que he realizado presenciales" +
    " y online para mi preparación al mundo de IT";
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
          <BackTop />         
          <Col lg={1} />
          <Col lg={22}>
            <div className="div"></div>
            <Col key="courses">
              <Suspense fallback={<></>}>
                <InfoBanner />
                <Courses
                  numItems={1000}
                  title={title}
                  subtitle={subtitle}
                  courses={courses && courses.docs}
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
            <div className="div"></div>
            <QueueAnim
              type={["alpha"]}
              delay={1000}
              duration={100}
              ease="easeInCubic"
            >
              <div className="education__button" key="volver">
                <Button type="primary" onClick={goBack}>
                  Volver
                </Button>
              </div>
            </QueueAnim>
            <div className="div"></div>
          </Col>
          <Col lg={1} />
        </Row>
      ) : (
        <Suspense fallback={<></>}>
          <Col key={url}>
            <CourseInfo url={url} courses={courses} />
          </Col>
        </Suspense>
      )}
    </>
  );
}
