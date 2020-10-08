import React, { useState, useEffect, Suspense, lazy } from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getCoursesApi } from "../../../api/education";
import queryString from "query-string";
import "./Education.scss";
const Pagination = lazy(() => import('../../../components/Pagination/Pagination'));
const Courses = lazy(() => import('../../../components/Web/Education/Courses'));
const CourseInfo = lazy(() => import('../../../components/Web/Education/CourseInfo'));

export default function Education(props) {
  const { location, history } = props;
  const { url } = useParams();
  const [courses, setCourses] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imageLoaded, setImageLoaded] = useState(false);
  const { page = 1 } = queryString.parse(location.search);  
  useEffect(() => {
    let unmounted = false;
    getCoursesApi(8, page)
    .then((response) => {
          if (!unmounted) {
            setCourses(response.courses);
          }
      });
      window.scrollTo(0, 0);
      return () => {unmounted = true};
  }, [page]);
  const title = "Todos los cursos";
  const subtitle = "Todos los cursos que he realizado presenciales" +
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
          <Col lg={1} />
          <Col lg={22}>
            <div className="div" ></div>
            <Col key="courses">
              <Suspense fallback={<></>}>
                <Courses                  
                  numItems={1000}
                  title={title}
                  subtitle={subtitle}
                  courses={courses && courses.docs}
                  location={location}
                  history={history}
                  setImageLoaded={setImageLoaded}
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
            <div className="div" ></div>            
          </Col>
          <Col lg={1} />
        </Row>
      ) : (
        <Suspense fallback={<></>}>
          <CourseInfo url={url} />
        </Suspense>
      )}
    </>
  );
}
