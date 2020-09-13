import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import MenuSider from "../components/Web/MenuSider";

import "./LayoutBasic.scss";

export default function LayoutBasic({ routes }) {
  //   const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { Footer } = Layout;

  const closeMenu = () => {
    if(menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };

  return (
    <Row
      className="layout-basic"
      onClick={closeMenu}
    >
      <Col span={0} xl={2} />
      <Col span={24} xl={20}>
        <MenuTop
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
        />
        <MenuSider
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          style={{ minHeight: 20 }}
        />
        <LoadRoutes routes={routes} />
        <Footer>David Thomas Pizarro Frick</Footer>
      </Col>
      <Col span={0} xl={2} />
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
