import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import MenuTop from "../components/Web/MenuTop";

import "./LayoutBasic.scss";

export default function LayoutBasic({ routes }) {
//   const { routes } = props;
  const { Footer } = Layout;

  return (
    <Row>
      <Col lg={4} />
      <Col span={24} lg={16}>
        <MenuTop />
        <LoadRoutes routes={routes} />
        <Footer>David Thomas Pizarro Frick</Footer>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
}