import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";

import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <Row className="footer__content">
        <Col span={0} md={2} />
        <Col span={24} md={20}>
          <Row>
            <Col md={8}><MyInfo /></Col>
            <Col md={8}><NavigationFooter /></Col>
            <Col md={8}>Newsletter</Col>
          </Row>
          <Row className="footer__copyright">
            <Col span={24} sm={12}>David Thomas Pizarro Frick</Col>
            <Col span={24} sm={12}>Desarrollador Web</Col>
          </Row>
        </Col>
        <Col span={0} md={2} />
      </Row>
    </Footer>
  );
}
