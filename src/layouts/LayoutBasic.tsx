import React, { useState, Suspense, lazy } from "react";
import useConnection from "../hooks/useConnection";
import { Layout } from "antd";
import "./LayoutBasic.scss";
const desktopImage = require("../assets/img/jpg/background-squares.jpg");
const mobileImage = require("../assets/img/jpg/background-squares-mobile.jpg");
const MenuTop = lazy(() => import("../components/Web/Layout/MenuTop"));
const MenuSider = lazy(() => import("../components/Web/Layout/MenuSider"));
const Footer = lazy(() => import("../components/Web/Layout/Footer"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));
const Spin = lazy(() => import("../components/Spin"));
const Error = lazy(() => import("../pages/Errors"));

export default function LayoutBasic(props: any) {
  const { routes } = props;
  const connection = useConnection();
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading={setIsLoading}
          />
          <MenuSider
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </div>
        <Content className="layout-basic__content">
          {!connection ? (
            <Spin />
            ) : (
              <>
              {connection === 200 ? (
                <>
              <LoadRoutes routes={routes && routes} />  
              </>
              ) : (
                <Error status={500} />
                )}
            </>
          )}
        </Content>
        <div className="layout-basic__footer">{isLoading && <Footer />}</div>
      </Suspense>
    </div>
  );
}
