import React, { useState, useEffect } from "react";
import { getImageApi } from "../../../../api/education";
import { Link } from "react-router-dom";
import { Row, Col, Card, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import "./Courses.scss";

export default function Courses(props) {
  const { courses, numItems, title, subtitle, setImageLoaded } = props;
  return (
    <>
      <Row>
        <Col span={24} className="courses-list__title">
          <h1 key="title">{title}</h1>
          <p key="subtitle">{subtitle}</p>
        </Col>
      </Row>
      <div className="courses-list">
        <Row>
          {courses &&
            courses.slice(0, numItems).map((course) => (
              <Col
                key={course._id}
                span={12}
                md={8}
                lg={8}
                xl={6}
                className="courses-list__courses"
              >
                <Course course={course} setImageLoaded={setImageLoaded} />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

function Course(props) {
  const { course, setImageLoaded } = props;
  const [image, setImage] = useState(null);
  const { Meta } = Card;
  useEffect(() => {
    let unmounted = false;
    setImage();
    if (course.image) {
      getImageApi(course.image).then((response) => {
        if (!unmounted) {
          let filePath = response.url;
          let fileName = filePath.split("/")[6];
          let thumbnailName = "thumb_" + fileName;
          let replaceName = filePath.replace(fileName, thumbnailName);
          setImage(replaceName);
          setImageLoaded(true);
        }
      });
    }
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);
  window.scrollTo(0, 0);
  return (
    <>
      <QueueAnim type={["alpha"]} duration={400} ease="easeInCubic">
        <div key="course">
          <Link to={`/education/${course.url}`}>
            <Card
              className="courses-list__card"
              cover={<img src={image} alt={course.title} type="image/jpg" />}
            >
              <Meta description={course.title} />
              <span className="courses-list__edit">
                <EyeOutlined />
              </span>
              <div className="courses-list__tags">
                <Tag className="courses-list__hours">
                  <b>{course.duration}</b> h
                </Tag>
                <Tag className="courses-list__tecnologies">
                  <b>{course.tags.length}</b> tech
                </Tag>
              </div>
            </Card>
          </Link>
        </div>
      </QueueAnim>
    </>
  );
}
