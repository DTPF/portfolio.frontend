import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import { Row, Col, Image, Tag, Button } from "antd";
import {
  getCourseApi,
  getImageApi,
  getCourseByOrderApi,
} from "../../../../api/education";
import QueueAnim from "rc-queue-anim";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import NoImage from "../../../../assets/img/png/no-image.png";
import "./CourseInfo.scss";

export default function CourseInfo(props: { url: any; courses: any }) {
  const { url, courses } = props;
  const [course, setCourse] = useState(null);
  useEffect(() => {
    let unmounted = false;
    getCourseApi(url).then((response) => {
      if (!unmounted) {
        setCourse(response.course);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [url]);
  return (
    <Row className="course-info">
      <Course course={course && course} courses={courses} />
    </Row>
  );
}

function Course(props: { course: any; courses: any }) {
  const { course, courses } = props;
  const [image, setImage] = useState("");
  const [prevCourse, setPrevCourse] = useState(null);
  const [nextCourse, setNextCourse] = useState(null);
  const goBack = useHistory().goBack;
  const prev = course && course.order + 1;
  const next = course && course.order - 1;
  const coursesLength = courses && courses.docs.length;
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
      window.scrollTo(0, 0);
    }
    return () => {
      unmounted = true;
    };
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
      <QueueAnim type={"alpha"} duration={150} ease="easeInCubic">
        <div className="course-info__goBack" key="div">
          <Button type="primary" onClick={goBack}>
            <LeftOutlined />
          </Button>
        </div>
        <Links prevCourse={prevCourse} nextCourse={nextCourse} />
      </QueueAnim>
      <Col span={24} className="course-info__title">
        <QueueAnim type={"alpha"} duration={200} ease="easeInCubic">
          <h1 key="title">{course && course.title}</h1>
        </QueueAnim>
      </Col>
      <QueueAnim type={"alpha"} duration={200} ease="easeInCubic">
        <div className="course-info__image" key="image">
          <Image
            src={image ? image : NoImage}
            alt={course && "Imágen de " + course.title}
            ></Image>
        </div>
        <Row className="course-info__info" key="info">
          <Col span={12} className="course-info__info-duration">
            {course && course.duration}&nbsp;horas
          </Col>
          <Col span={12} className="course-info__info-date">
            Hace&nbsp;{course && moment(course.date).fromNow(true)}
          </Col>
        </Row>
        <Col className="course-info__description" key="description">
          <p>{course && course.description}</p>
        </Col>
        <Row className="course-info__tags" key="tags">
          <Tags course={course && course} />
        </Row>
        <Row key="bar" className="course-info__button">
          <Col span={24} className="course-info__button-link">
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <LinkOutlined />
                Enlace a {course && course.platform}
              </a>
            )}
          </Col>
        </Row>
      </QueueAnim>
    </>
  );
}

function Links(props: { prevCourse: any; nextCourse: any }) {
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

function Tags(props: { course: any }) {
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
    <>
      <div className="course-info__tags-div">
        {tags &&
          tags.map((tag) => (
            <span key={tag} className={tag}>
              <Tag>{tag}</Tag>
            </span>
          ))}
      </div>
    </>
  );
}
