import React, { useState } from "react";
import { Row, Col, Button, Image as ImageAnt, Tag } from "antd";
import QueueAnim from "rc-queue-anim";
import Modal from "../../../UI/Modal";
import { gaEvent } from "../../../../utils/analytics.js";
import "./ProjectLayout.scss";

export default function ProyectLayout(props: {
  innerWidth: number;
  align: string;
  contentTitle: string;
  contentText: string;
  linkToWeb: string;
  image: string;
  imageAlt: string;
  modalTitle: string;
  modalTags: [string];
  modalImage1: string;
  modalImage2: string;
  modalImage3: string;
  modalImageAlt: string;
  modalDate: string;
  modalIntroduction: string;
  modalText: [string];
}) {
  const {
    innerWidth,
    align,
    linkToWeb,
    image,
    imageAlt,
    contentTitle,
    contentText,
    modalTitle,
    modalTags,
    modalImage1,
    modalImage2,
    modalImage3,
    modalImageAlt,
    modalDate,
    modalIntroduction,
    modalText,
  } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  return (
    <>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        className="project-layout-modal-ant"
      >
        <ModalContent
          modalTags={modalTags}
          modalImage1={modalImage1}
          modalImage2={modalImage2}
          modalImage3={modalImage3}
          modalImageAlt={modalImageAlt}
          modalDate={modalDate}
          modalIntroduction={modalIntroduction}
          modalText={modalText}
          modalTitle={modalTitle}
        />
      </Modal>
      <div className="clearfix">
        <Row className={"project-layout project-layout-" + align}>
          {innerWidth <= 767 ? (
            <>
              <Content
                contentTitle={contentTitle}
                contentText={contentText}
                setIsVisibleModal={setIsVisibleModal}
              />
              <Image image={image} linkToWeb={linkToWeb} imageAlt={imageAlt} />
            </>
          ) : (
            <>
              {align === "left" ? (
                <>
                  <Image
                    image={image}
                    linkToWeb={linkToWeb}
                    imageAlt={imageAlt}
                  />
                  <Content
                    contentTitle={contentTitle}
                    contentText={contentText}
                    setIsVisibleModal={setIsVisibleModal}
                  />
                </>
              ) : (
                <>
                  <Content
                    contentTitle={contentTitle}
                    contentText={contentText}
                    setIsVisibleModal={setIsVisibleModal}
                  />
                  <Image
                    image={image}
                    linkToWeb={linkToWeb}
                    imageAlt={imageAlt}
                  />
                </>
              )}
            </>
          )}
        </Row>
      </div>
    </>
  );
}

function Image(props: {
  linkToWeb: string
  image: string
  imageAlt: string
}) {
  const { linkToWeb, image, imageAlt } = props;
  const clickProyectImage = () => {
    gaEvent("click_project_image_" + linkToWeb, "clicks", "UI Clicks", true);
  };
  return (
    <Col span={24} md={12} className="project-layout__image">
      <QueueAnim type={"alpha"} duration={250} ease="easeInCubic">
        <div key="image" onClick={() => clickProyectImage}>
          <a href={linkToWeb} target="_blank" rel="noopener noreferrer">
            <img width="100%" alt={imageAlt} src={image}></img>
          </a>
        </div>
      </QueueAnim>
    </Col>
  );
}

function Content(props: {
  contentTitle: string;
  contentText: string;
  setIsVisibleModal: React.Dispatch<boolean>;
}) {
  const { contentTitle, contentText, setIsVisibleModal } = props;
  const gaTitle = contentTitle.replace(/[ ']/g, "");
  const clickProject = () => {
    gaEvent("click_project_modal" + gaTitle, "clicks", "UI Clicks", true);
  };
  return (
    <Col span={24} md={12} className="project-layout__content">
      <Col span={24} className="project-layout__content-text">
        <QueueAnim type={"alpha"} duration={350} ease="easeInCubic">
          <div className="project-layout__content-title" key="titleh2">
            <h2>{contentTitle}</h2>
          </div>
          <div>
            <p>{contentText}</p>
          </div>
        </QueueAnim>
      </Col>
      <Button
        onClick={() => {
          clickProject();
          setIsVisibleModal(true);
        }}
      >
        Ver más
      </Button>
    </Col>
  );
}

function ModalContent(props: {
  modalTags: string[];
  modalImage1: string;
  modalImage2: string;
  modalImage3: string;
  modalImageAlt: string;
  modalDate: string;
  modalIntroduction: string;
  modalText: string[];
  modalTitle: string;
}) {
  const {
    modalTags,
    modalImage1,
    modalImage2,
    modalImage3,
    modalImageAlt,
    modalDate,
    modalIntroduction,
    modalText,
    modalTitle,
  } = props;
  let gaModalTitle = modalTitle.replace(/[ ']/g, "");
  const clickProyectModalImage = (e: number) => {
    gaEvent(
      "click_project_modal_image_" + e + "_" + gaModalTitle,
      "clicks",
      "UI Clicks",
      true
    );
  };
  return (
    <Row className="project-layout__modal">
      <Row className="project-layout__modal-image">
        <Col span={8} onClick={() => clickProyectModalImage(1)}>
          <ImageAnt
            width="100%"
            alt={modalImageAlt}
            src={modalImage1}
          ></ImageAnt>
        </Col>
        <Col span={8} onClick={() => clickProyectModalImage(2)}>
          <ImageAnt
            width="100%"
            alt={modalImageAlt}
            src={modalImage2}
          ></ImageAnt>
        </Col>
        <Col span={8} onClick={() => clickProyectModalImage(3)}>
          <ImageAnt
            width="100%"
            alt={modalImageAlt}
            src={modalImage3}
          ></ImageAnt>
        </Col>
      </Row>
      <div className="project-layout__modal-content">
        <Col span={24} className="project-layout__modal-content-date">
          <span>{modalDate}</span>
        </Col>
        <Col span={24} className="project-layout__modal-content-introduction">
          <p>{modalIntroduction}</p>
        </Col>
        <Col span={24} className="project-layout__modal-content-large-text">
          {modalText &&
            modalText.map((text: string, key: number) => {
              return (
                <div key={key + 1}>
                  <span key={key + 2}>{text}</span>
                  <br key={key + 3}></br>
                </div>
              );
            })}
        </Col>
      </div>
      <Col span={24} className="project-layout__modal-tags">
        {modalTags &&
          modalTags.map((tag: string) => {
            let tagToClassname = tag.replace(/[ .]/g, "");
            return (
              <span key={tag} className={tagToClassname}>
                <Tag>{tag}</Tag>
              </span>
            );
          })}
      </Col>
    </Row>
  );
}
