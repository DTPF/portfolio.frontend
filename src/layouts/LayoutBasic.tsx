import React, { useState, Suspense, lazy } from "react";
import { Layout } from "antd";
import "./LayoutBasic.scss";
const desktopImage = require("../assets/img/jpg/background-squares.jpg");
const mobileImage = require("../assets/img/jpg/background-squares-mobile.jpg");
const MenuTop = lazy(() => import("../components/Web/Layout/MenuTop"));
const MenuSider = lazy(() => import("../components/Web/Layout/MenuSider"));
const Footer = lazy(() => import("../components/Web/Layout/Footer"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));

export default function LayoutBasic(props: any) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const backgroundImage = window.innerWidth >= 650 ? desktopImage : mobileImage;
  const { Content } = Layout;
  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };
  return (
    <div
      className="layout-basic"
      onClick={closeMenu}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Suspense fallback={<></>}>
        <div className="layout-basic__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
          <MenuSider
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </div>
        <Content className="layout-basic__content">
          <LoadRoutes routes={routes && routes} />
        </Content>
        <div className="layout-basic__footer">
          <Suspense fallback={<></>}>
            <Footer />
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
}
