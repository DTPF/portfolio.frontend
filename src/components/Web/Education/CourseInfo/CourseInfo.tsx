import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import { Row, Col, Image, Tag, Button } from "antd";
import { Helmet } from "react-helmet";
import {
  getCourseApi,
  getImageApi,
  getCourseByOrderApi,
} from "../../../../api/education";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LinkOutlined
} from "@ant-design/icons";
import NoImage from "../../../../assets/img/png/no-image.png";
import "./CourseInfo.scss";
import Spin from "../../../../components/UI/Spin";
const Error = lazy(() => import("../../../../pages/Errors"));

export default function CourseInfo(props: any) {
  const { url, courses } = props;
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let unmounted = false;
    getCourseApi(url).then((response) => {
      if (response.status === 200) {
        if (!unmounted) {
          setCourse(response.course);
          setIsLoading(true);
        }        
      } else {
        if (!unmounted) {
          setCourse(null);
          setIsLoading(true);
        }
      }
    });
    return () => { unmounted = true;  };
  }, [url]);   
  return (
    <div className="course-info">
      {!isLoading ? (
        <Spin />
        ) : (
          <>
            {course ? (
              <Course course={course && course} courses={courses} />
            ) : (
              <Suspense fallback={<></>}>
                <Error
                  status={404}
                  title="Ups!! Curso no encontrado..."
                  subtitle="Lo siento, el curso que buscas no existe."
                />    
              </Suspense>   
            )}
          </>
      )}
    </div>
  );
}

function Course(props: any) {
  const { course, courses } = props;
  const [image, setImage] = useState("");
  const [prevCourse, setPrevCourse] = useState(null);
  const [nextCourse, setNextCourse] = useState(null);
  const prev = course && course.order + 1;
  const next = course && course.order - 1;
  const coursesLength = courses.docs && courses.docs.length;
  const link = course && course.link;
  useEffect(() => {
    let unmounted = false;
    if (course) {
      if (prev === coursesLength + 1 || !coursesLength) {
        getCourseByOrderApi(1).then((response) => {
          if (!unmounted) {
            setPrevCourse(response.course);
          }
        });
      } else {
        getCourseByOrderApi(prev).then((response) => {
          if (!unmounted) {
              setPrevCourse(response.course);
          }
        });
      }
      if (next === 0) {
        getCourseByOrderApi(coursesLength).then((response) => {
          if (!unmounted) {
            setNextCourse(response.course);
          }
        });
      } else {
        getCourseByOrderApi(next).then((response) => {
          if (!unmounted) {
            setNextCourse(response.course);
          }
        });
      }
    }
    return () => { unmounted = true };
  }, [course, prev, next, coursesLength]);
  useEffect(() => {
    let unmounted = false;
    if (course && course.image) {
      getImageApi(course.image).then((response) => {
        if (!unmounted) {
          setImage(response.url);
        }
      });
    }
    return () => { unmounted = true };
  }, [course]);  
  return (
    <>
      <Helmet>
        <title>Formación | {course.title}</title>
        <meta
          name="description"
          content={course.title}
          data-react-helmet="true"
        />
      </Helmet>
        <Links prevCourse={prevCourse} nextCourse={nextCourse} />
      <Col span={24} className="course-info__title">
          <h1>{course.title}</h1>
      </Col>
        <div className="course-info__image">
          <Image
            src={image ? image : NoImage}
            alt={course && "Imágen de " + course.title}
            ></Image>
        </div>
        <Row className="course-info__info">
          <Col span={12} className="course-info__info-duration">
            {course && course.duration}&nbsp;horas
          </Col>
          <Col span={12} className="course-info__info-date">
            Hace&nbsp;{course && moment(course.date).fromNow(true)}
          </Col>
        </Row>
        <Col className="course-info__description">
          <p>{course && course.description}</p>
        </Col>
        <Row className="course-info__tags">
          <Tags course={course && course} />
        </Row>
        <Row className="course-info__button">
          <Col span={24} className="course-info__button-link">
            {link && (
              <Button>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <LinkOutlined />
                  Enlace a Certificación
                </a>
              </Button>
            )}
          </Col>
        </Row>
    </>
  );
}

function Links(props: any) {
  const { prevCourse, nextCourse } = props;
  const prevLink = `/education/${prevCourse && prevCourse.url}`;
  const nextLink = `/education/${nextCourse && nextCourse.url}`;
  return (
    <>
      <div className="course-info__linkPrevMobile" key="prevMob">
        {prevCourse && prevCourse.url && (
          <Link to={prevLink}>
            <Button type="primary">
              <ArrowLeftOutlined />
            </Button>
          </Link>
        )}
      </div>
      <div className="course-info__linkNextMobile" key="nextMob">
        {nextCourse && nextCourse.url && (
          <Link to={nextLink}>
            <Button type="primary">
              <ArrowRightOutlined />
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

function Tags(props: any) {
  const { course } = props;
  const [tags, setTags] = useState([]);
  useEffect(() => {
    let unmounted = false;
    const url = course && course.url;
    if (url) {
      getCourseApi(url).then((response) => {
        if (!unmounted) {
          setTags(response.course && response.course.tags);
        }
      });
    }
    return () => { unmounted = true };
  }, [course]);
  return (
    <div className="course-info__tags-div">
      {tags &&
        tags.map((tag: string) => {
          const tagToClassname = tag.replace(/[ .]/g, "");
          return (
            <span key={tag} className={tagToClassname}>
              <Tag>{tag}</Tag>
            </span>
          )
      })}
    </div>
  );
}
