import React, { Suspense, lazy } from "react";
import { Row, Col } from "antd";
import "./MainBanner.scss";
const QueueAnim = lazy(() => import('rc-queue-anim'));

export default function MainBanner() {
  return (
    <>
      <Suspense fallback={<></>}>
        <QueueAnim type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']} duration={3000}>
          <div className="main-banner" key="banner">
            <div className="main-banner__dark" />
            <Row>
              <Col lg={4} />
              <Col lg={16}>
                <h2>
                  Aprende nuevas <br /> tecnologías web y móvil.
                </h2>
                <h3>
                  A través de cursor prácticos, concisos y actualizados, creados por{" "}
                  <br />
                  profesionales con años de experiencia.
                </h3>
              </Col>
              <Col lg={4} />
            </Row>
          </div>
        </QueueAnim>
      </Suspense>
    </>
  );
}