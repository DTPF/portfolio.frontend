import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import { Row, Col, Image, Tag, Button, Spin } from "antd";
import { getCourseApi, getImageApi } from "../../../../api/education";
import QueueAnim from "rc-queue-anim";
import { LinkOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import NoImage from '../../../../assets/img/png/no-image.png'
import "./CourseInfo.scss";

export default function CourseInfo(props) {
  const { url } = props;
  const [course, setCourse] = useState([]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getCourseApi(url).then((response) => {
        setCourse(response.course);
      });
    }
    return () => {unmounted = true};
  }, [url]);
  return (
    <Row className="course-info">
      <Course course={course} />
    </Row>
  );
}

function Course(props) {
  const { course } = props;
  const [image, setImage] = useState(null);
  const goBack = useHistory().goBack;
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
    return () => {unmounted = true};
  }, [course]);
  const link = course && course.link;
  return (
    <>
      <Col className="course-info__title">
        <h1>{course && course.title}</h1>
      </Col>
      <QueueAnim
              type={["alpha"]}
              duration={400}
              ease="easeInCubic"
            >
        <Col span={24} className="course-info__image" key="image">
          <Image
            src={image ? image : NoImage}
            alt={course && "Imágen de " + course.title}
            type="image/jpg"
          ></Image>
        </Col>
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
          <Tags course={course} />
        </Row>
        <Row key="bar">
          <Col span={12} className="course-info__link">
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer">
              <LinkOutlined />
                Enlace a {course && course.platform}
              </a>
            )}
          </Col>
          <Col span={12} className="course-info__button">
            <Button type="primary" onClick={goBack}>
              <ArrowLeftOutlined />
              Volver
            </Button>
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
    if (!unmounted) {
      if (url !== undefined) {
        getCourseApi(url).then((response) => {
          setTags(response.course && response.course.tags);
        });
      }
    }
    return () => {unmounted = true};
  }, [course]);
  return (
    <>
      <div className="course-info__tags-div">
        {tags.map((tag) => (
          <span key={tag} className={tag}>
            <Tag tag={tag}>{tag}</Tag>
          </span>
        ))}
      </div>
    </>
  );
}
