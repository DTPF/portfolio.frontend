import React, { useState, useEffect, Suspense, lazy } from "react";
import { useGetCourses } from "../../../hooks/useGetCourses";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import "./Education.scss";
import Courses from "../../../components/Web/Education/Courses";
import InfoBanner from "../../../components/Web/Education/InfoBanner";
import Spin from "../../../components/UI/Spin";
const Pagination = lazy(() => import("../../../components/UI/Pagination"));
const CourseInfo = lazy(() => import("../../../components/Web/Education/CourseInfo"));

export default function Education(props: any) {
  const { location, history } = props;
  interface URL { url: string }
  const { url } = useParams<URL>();
  const [courses] = useGetCourses(100, location);
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsLoading(true);
    }
    return () => { unmounted = true };
  }, []);
  const title = "Todos los cursos";
  const subtitle =
    "Cursos realizados online y " +
    "presenciales para mi preparación al mundo de IT";
  return (
    <>
      {!url ? (
        <>
          {!isLoading ? (
            <Spin />
          ) : (
            <Row className="education">
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
              </Col>
              <Col lg={1} />
            </Row>
          )}
        </>
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
