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

export default function CourseInfo(props) {
  const { url, courses } = props;
  const [course, setCourse] = useState(null);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getCourseApi(url).then((response) => {
        setCourse(response.course);
      });
    }
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

function Course(props) {
  const { course, courses } = props;
  const [image, setImage] = useState(null);
  const [prevCourse, setPrevCourse] = useState([]);
  const [nextCourse, setNextCourse] = useState([]);
  const goBack = useHistory().goBack;
  const prev = course && course.order + 1;
  const next = course && course.order - 1;
  const coursesLength = courses && courses.docs.length;
  useEffect(() => {
    let unmounted = false;
    if (course) {
      if (prev === coursesLength + 2 || !coursesLength) {
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
        getCourseByOrderApi(coursesLength + 1).then((response) => {
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
    setImage();
    if (course && course.image) {
      getImageApi(course.image).then((response) => {
        if (!unmounted) {
          setImage(response.url);
        }
      });
    }
    return () => {
      unmounted = true;
    };
  }, [course]);
  const link = course && course.link;
  const prevLink = `/education/${prevCourse.url}`;
  const nextLink = `/education/${nextCourse.url}`;
  return (
    <>
      <QueueAnim type={["alpha"]} duration={150} ease="easeInCubic">
        <div className="course-info__goBack" key="div">
          <Button type="primary" onClick={goBack}>
            <LeftOutlined />
          </Button>
        </div>
        <div span={3} sm={2} className="course-info__linkPrevMobile" key="prevMob">
          {prevCourse.url && (
            <Link to={prevLink}>
              <Button type="primary">
                <ArrowLeftOutlined />
              </Button>
            </Link>
          )}
        </div>
        <div className="course-info__linkNextMobile" key="nextMob">
          {nextCourse.url && (
            <Link to={nextLink}>
              <Button type="primary">
                <ArrowRightOutlined />
              </Button>
            </Link>
          )}
        </div>
      </QueueAnim>
      <Col className="course-info__title">
        <Col span={3} sm={2} className="course-info__title-linkPrev">
          {prevCourse.url && (
            <Link to={prevLink} key="prev">
              <Button type="primary">
                <ArrowLeftOutlined />
              </Button>
            </Link>
          )}
        </Col>
        <Col span={18} sm={20}>
          <QueueAnim type={["alpha"]} duration={200} ease="easeInCubic">
            <h1 key="title">{course && course.title}</h1>
          </QueueAnim>
        </Col>
        <Col span={3} sm={2} className="course-info__title-linkNext">
          {nextCourse.url && (
            <Link to={nextLink}>
              <Button type="primary">
                <ArrowRightOutlined />
              </Button>
            </Link>
          )}
        </Col>
      </Col>
      <QueueAnim type={["alpha"]} duration={200} ease="easeInCubic">
        <div className="course-info__image" key="image">
          <Image
            src={image ? image : NoImage}
            alt={course && "Imágen de " + course.title}
            type="image/jpg"
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
          {course && course.description}
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

function Tags(props) {
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
    return () => {unmounted = true};
  }, [course]);
  return (
    <>
      <div className="course-info__tags-div">
        {tags &&
          tags.map((tag) => (
            <span key={tag} className={tag}>
              <Tag tag={tag}>{tag}</Tag>
            </span>
          ))}
      </div>
    </>
  );
}
