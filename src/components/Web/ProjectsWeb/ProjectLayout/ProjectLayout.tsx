import React from "react";
import { Row, Col, Button } from "antd";
import QueueAnim from "rc-queue-anim";
import "./ProjectLayout.scss";

export default function ProyectLayout(props: any) {
  const {
    innerWidth,
    align,
    link,
    image,
    imageAlt,
    contentTitle,
    contentText,
  } = props;
  return (
    <Row className={"project-layout project-layout-" + align}>
      {innerWidth <= 767 ? (
        <>
          <Content
            contentTitle={contentTitle}
            contentText={contentText}
          />
          <Image image={image} link={link} imageAlt={imageAlt} />
        </>
      ) : (
        <>
          {align === "left" ? (
            <>
              <Image image={image} link={link} imageAlt={imageAlt} />
              <Content
                contentTitle={contentTitle}
                contentText={contentText}
              />
            </>
          ) : (
            <>
              <Content
                contentTitle={contentTitle}
                contentText={contentText}
              />
              <Image image={image} link={link} imageAlt={imageAlt} />
            </>
          )}
        </>
      )}
    </Row>
  );
}

function Image(props: any) {
  const { link, image, imageAlt } = props;
  return (
    <Col span={24} md={12} className="project-layout__image">
      <QueueAnim type={"alpha"} duration={250} ease="easeInCubic">
        <div key="image">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img width="100%" alt={imageAlt} src={image}></img>
          </a>
        </div>
      </QueueAnim>
    </Col>
  );
}

function Content(props: any) {
  const { contentTitle, contentText } = props;
  return (
    <Col span={24} md={12} className="project-layout__content">
      <Col span={24} className="project-layout__content-text">
        <QueueAnim type={"alpha"} duration={350} ease="easeInCubic">
          <div className="project-layout__content-title" key="titleh2">
            <h2>{contentTitle}</h2>
          </div>
          <div key="p">
            <p>
              {contentText}
            </p>
          </div>
        </QueueAnim>
      </Col>
      <Button>Ver más</Button>
    </Col>
  );
}
