import React, { useState, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutBasic.scss";
const MenuTop = lazy(() => import("../components/Web/MenuTop"));
const MenuSider = lazy(() => import("../components/Web/MenuSider"));
const Footer = lazy(() => import("../components/Web/Footer"));

export default function LayoutBasic(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { Content } = Layout;
  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };
  return (
    <div className="layout-basic" onClick={closeMenu}>
      <Suspense fallback={<></>}>
        <div className="layout-basic__header">
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
        <div className="layout-basic__footer">
          <Footer />
        </div>
      </Suspense>
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
