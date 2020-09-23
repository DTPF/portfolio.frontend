import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Web/MenuTop";
import MenuSider from "../components/Web/MenuSider";
import Footer from "../components/Web/Footer";
import QueueAnim from "rc-queue-anim";

import "./LayoutBasic.scss";

export default function LayoutBasic({ routes }) {
  //   const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { Content } = Layout;

  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };

  return (
    <div className="layout-basic" onClick={closeMenu}>
      <QueueAnim type={["top"]} duration={1000} ease="easeOutBounce">
        <div className="layout-basic__header" key="header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
          <MenuSider
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
            style={{ minHeight: 20 }}
          />
        </div>
        <Content className="layout-basic__content">
          <LoadRoutes routes={routes} />
        </Content>
        <div className="layout-basic__footer" key="footer">
          <Footer />
        </div>
      </QueueAnim>
    </div>
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
