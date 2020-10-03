import React, {useState, useEffect} from "react";
import {Row, Col, Spin} from "antd";
import {Helmet} from "react-helmet";
import Courses from "../../../components/Web/Education/Courses";
import {getCoursesApi} from "../../../api/education";
import queryString from "query-string";
import Pagination from "../../../components/Pagination/Pagination";
import {LoadingOutlined} from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";

import "./Education.scss";

export default function Education(props) {
  const { location, history } = props;
  const [courses, setCourses] = useState(null);
  const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;
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
      <Row className="education">
        <Col lg={1} />
        <Col lg={22}>
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
            <>
            <QueueAnim
              type={["bottom", "top"]}
              duration={600}
              ease="easeInCubic"
            >
              <div className="div" ></div>
              <Col key="courses">
                <Courses                  
                  numItems={1000}
                  title={title}
                  subtitle={subtitle}
                  courses={courses.docs}
                  location={location}
                  history={history}
                />
              </Col>
              <div className="div"></div>
            </QueueAnim>            
            {courses.totalPages > 1 && (
              <QueueAnim
                type={["bottom", "top"]}
                duration={600}
                ease="easeInCubic"
              >
                <Col key="pagination">
                  <Pagination courses={courses} location={location} history={history} />
                </Col>
              </QueueAnim>
            )}
            <div className="div" ></div>
            </>
          )}
        </Col>
        <Col lg={1} />
      </Row>
    </>
  );
}
