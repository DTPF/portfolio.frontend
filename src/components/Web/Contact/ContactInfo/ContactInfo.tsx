import React from "react";
import { Row, Col } from "antd";
import { WhatsAppOutlined, PhoneTwoTone, MailTwoTone } from "@ant-design/icons";
import "./ContactInfo.scss";

export default function ContactInfo() {
  return (
    <Row className="contact__info">
      <Col span={24} className="contact__info-title">
        <p>
          Ponte en contacto conmigo directamente vía formulario o a través de
          los datos de contacto
        </p>
        <h2>David Thomas Pizarro Frick</h2>
      </Col>
      <Col span={24} md={14} lg={13} className="contact__info-email">
        <MailTwoTone twoToneColor={"rgb(46, 74, 164)"} />
        <h3>davidpizarrofrick@gmail.com</h3>
      </Col>
      <Col span={24} md={10} lg={11} className="contact__info-phone">
        <WhatsAppOutlined />
        <PhoneTwoTone twoToneColor={"#273b56"} />
        <h3>+34 652490504</h3>
      </Col>
    </Row>
  );
}
