import React, { useState } from "react";
import { Row, Col, Button, Image as ImageAnt, Tag } from "antd";
import QueueAnim from "rc-queue-anim";
import Modal from "../../../UI/Modal";
import { gaEvent } from "../../../../utils/analytics.js";
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
        {
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
        }
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
                <Image image={image} link={link} imageAlt={imageAlt} />
              
              </>
            )}
          </>
        )}
      </Row>
     </div>
    </>
  );
}

function Image(props: any) {
  const { link, image, imageAlt } = props;
  const clickProyectImage = () => {
    gaEvent("click_project_image_"+link, "clicks", "UI Clicks", true);
  };
  return (
    <Col span={24} md={12} className="project-layout__image">
      <QueueAnim type={"alpha"} duration={250} ease="easeInCubic">
        <div key="image" onClick={() => clickProyectImage}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img width="100%" alt={imageAlt} src={image}></img>
          </a>
        </div>
      </QueueAnim>
    </Col>
  );
}

function Content(props: any) {
  const { contentTitle, contentText, setIsVisibleModal } = props;
  const modalVisible = () => {
    setIsVisibleModal(true);
  };
  let gaTitle = contentTitle.replace(/[ ']/g, "");
  const clickProject = () => {
    gaEvent("click_project_modal"+gaTitle, "clicks", "UI Clicks", true);
  };
  return (
    <Col span={24} md={12} className="project-layout__content">
      <Col span={24} className="project-layout__content-text">
        <QueueAnim type={"alpha"} duration={350} ease="easeInCubic">
          <div className="project-layout__content-title" key="titleh2">
            <h2>{contentTitle}</h2>
          </div>
          <div key="p">
            <p>{contentText}</p>
          </div>
        </QueueAnim>
      </Col>
      <Button onClick={() => {clickProject(); modalVisible()}}>Ver más</Button>
    </Col>
  );
}

function ModalContent(props: any) {
  const {
    modalTags,
    modalImage1,
    modalImage2,
    modalImage3,
    modalImageAlt,
    modalDate,
    modalIntroduction,
    modalText,
    modalTitle
  } = props;
  let gaModalTitle = modalTitle.replace(/[ ']/g, "");
  const clickProyectModalImage = (e: any) => {
    gaEvent("click_project_modal_image_"+e+"_"+gaModalTitle, "clicks", "UI Clicks", true);
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
          modalText.map((text: any, key: any) => {
            return (
              <div key={key+1}>
                <span key={key+2}>{text}</span>
                <br key={key+3}></br>
              </div>
            );
          })
        }
      </Col>
      </div>
      <Col span={24} className="project-layout__modal-tags">
        {modalTags &&
          modalTags.map((tag: any) => {
            let tagToClassname = tag.replace(/[ .]/g, "");
            return (
              <span key={tag} className={tagToClassname}>
                <Tag>{tag}</Tag>
              </span>
            );
          })
        }
      </Col>
    </Row>
  );
}
