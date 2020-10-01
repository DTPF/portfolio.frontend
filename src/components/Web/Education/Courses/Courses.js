import React, { useState, useEffect } from "react";
import { getImageApi } from "../../../../api/education";
import { Row, Col, Card, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";

import "./Courses.scss";

export default function Courses(props) {
  const { courses, numItems, title, subtitle } = props;
  return (
    <>
      <Col span={24} className="courses-list__title">
        <QueueAnim
          type={["bottom", "top"]}
          duration={400}
          ease="easeInCubic"
        >
          <h1 key="title">{title}</h1>
        </QueueAnim>
        <QueueAnim
          type={["bottom", "top"]}
          duration={600}
          ease="easeInCubic"
        >
          <p key="subtitle">{subtitle}</p>
        </QueueAnim>
      </Col>
      <div className="courses-list">
        <Row>
          {courses.slice(0, numItems).map((course) => (
            <Col
              key={course._id}
              span={12}
              md={8}
              lg={8}
              xl={6}
              className="courses-list__courses"
            >
              <Course course={course} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

function Course(props) {
  const { course } = props;
  const [image, setImage] = useState(null);
  const { Meta } = Card;
  useEffect(() => {
    let unmounted = false;
    setImage();
    if (course.image) {
      getImageApi(course.image).then((response) => {
        if (!unmounted) {
          setImage(response.url);
        }
      });
    } else {
      setImage(null);
    }
    return () => {unmounted = true};
  }, [course]);

  return (
    <>
      <Card
        className="courses-list__card"
        cover={
          <img src={image} alt={course.title} type="image/webp" />
        }
      >
        <Meta description={course.title} />
        <span className="courses-list__edit">
          <EyeOutlined />
        </span>
        <div className="courses-list__tags">
          <Tag className="courses-list__hours">
            <b>{course.duration}</b> hrs
          </Tag>
          <Tag className="courses-list__tecnologies">
            <b>{course.tags.length}</b> tech
          </Tag>
        </div>
      </Card>
    </>
  );
}
