import React, { useState, Suspense, lazy } from "react";
import GetCoursesInfo from "../../../dbIndexed/courses/GetCoursesInfo";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useConnection from "../../../hooks/useConnection";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import "./Education.scss";
import Courses from "../../../components/Web/Education/Courses";
import InfoBanner from "../../../components/Web/Education/InfoBanner";
const Pagination = lazy(() => import("../../../components/UI/Pagination"));
const CourseInfo = lazy(
  () => import("../../../components/Web/Education/CourseInfo")
);

export default function Education(props: any) {
  const { location, history } = props;
  interface URL {
    url: string;
  }
  const { url } = useParams<URL>();
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const courses = GetCoursesInfo(
    connectionStatus === 500 || !isNavigatorOnline ? 1000 : itemsPerPage
  );
  useScrollToTop();
  return (
    <RenderEducation
      url={url}
      location={location}
      history={history}
      courses={courses}
      itemsPerPage={
        connectionStatus === 500 || !isNavigatorOnline ? 1000 : itemsPerPage
      }
      setItemsPerPage={setItemsPerPage}
    />
  );
}

function RenderEducation(props: any) {
  const {
    url,
    location,
    history,
    courses,
    itemsPerPage,
    setItemsPerPage,
  } = props;
  const title = "Todos los cursos";
  const subtitle =
    "Cursos realizados online y " +
    "presenciales para mi preparación al mundo de IT";
  return (
    <>
      {!url ? (
        <Row className="education">
          <Col lg={1} />
          <Col lg={22}>
            <div className="div"></div>
            <Col className="education__info-courses" key="courses">
              <InfoBanner />
              <Courses
                itemsPerPage={itemsPerPage}
                title={title}
                subtitle={subtitle}
                courses={courses && courses.docs}
                location={location}
                history={history}
              />
            </Col>
            <div className="div"></div>
            {(courses?.totalPages > 1 ||
              itemsPerPage === courses?.totalDocs) && (
              <>
                <Col key="pagination">
                  <Suspense fallback={<></>}>
                    <Pagination
                      courses={courses}
                      location={location}
                      history={history}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                    />
                  </Suspense>
                </Col>
              </>
            )}
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
