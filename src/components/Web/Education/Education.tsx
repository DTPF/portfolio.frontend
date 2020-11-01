import React, { useEffect, Suspense, lazy } from "react";
import { useGetCourses } from "../../../hooks/useGetCourses";
import { useParams } from "react-router-dom";
import { Row, Col, BackTop } from "antd";
import "./Education.scss";
import Courses from "../../../components/Web/Education/Courses";
import InfoBanner from "../../../components/Web/Education/InfoBanner";
import CategoriesBigButtons from "../../../components/Web/CategoriesBigButtons/CategoriesBigButtons";
const Pagination = lazy(() => import("../../../components/UI/Pagination"));
const CourseInfo = lazy(() => import("../../../components/Web/Education/CourseInfo"));

export default function Education(props: any) {
  const { location, history } = props;
  interface URL { url: string };
  const { url } = useParams<URL>();
  const [courses] = useGetCourses(100, location);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <RenderEducation
      url={url}
      location={location}
      history={history}
      courses={courses}  
    />
  );
}

function RenderEducation(props: any) {
  const { url, location, history, courses } = props;
  const title = "Todos los cursos";
  const subtitle =
    "Todos los cursos que he realizado presenciales" +
    " y online para mi preparación al mundo de IT";
  return (
    <>
    {!url ? (
      <Row className="education">
        <BackTop duration={800} />
        <Col lg={1} />
        <Col lg={22}>
          <div className="div"></div>
          <Col className="education__info-courses" key="courses">
            <InfoBanner />
            <Courses
              numItems={10000}
              title={title}
              subtitle={subtitle}
              courses={courses && courses.docs}
              location={location}
              history={history}
            />
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
            <CategoriesBigButtons
              location={location.pathname}
              extra="categories-big-buttons__extra"
            />
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