import React, { useState, Suspense, lazy } from "react";
import useConnection from "../hooks/useConnection";
import { gaEvent } from "../utils/analytics.js";
import { Layout, BackTop, Tag, Alert } from "antd";
import { StopOutlined } from "@ant-design/icons";
import "./LayoutBasic.scss";
const desktopImage = require("../assets/img/jpg/background-squares.jpg");
const mobileImage = require("../assets/img/jpg/background-squares-mobile.jpg");
const MenuTop = lazy(() => import("../components/Web/Layout/MenuTop"));
const MenuSider = lazy(() => import("../components/Web/Layout/MenuSider"));
const Footer = lazy(() => import("../components/Web/Layout/Footer"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));
const Error = lazy(() => import("../pages/Errors"));

export default function LayoutBasic(props: any) {
  const { routes } = props;
  const { connection, isOnline } = useConnection();
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {!isOnline && (
        <>
          <Tag className="offline-message" icon={<StopOutlined />}>
            Offline
          </Tag>
          <Alert
            className="offline-message-alert"
            message="Comprueba tu conexión a internet para visualizar ver todo el contenido."
            type="info"
            closeText="Cerrar aviso"
          />
        </>
      )}
      <RenderLayoutBasic
        routes={routes}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
        connection={connection}
      />
    </>
  );
}

function RenderLayoutBasic(props: any) {
  const {
    routes,
    isLoading,
    setIsLoading,
    menuCollapsed,
    setMenuCollapsed,
    connection,
  } = props;
  const backgroundImage = window.innerWidth >= 650 ? desktopImage : mobileImage;
  const { Content } = Layout;
  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };
  const clickBackTop = () => {
    gaEvent("click_back_top", "clicks", "UI Clicks", true);
  };
  return (
    <div
      className="layout-basic"
      onClick={closeMenu}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <BackTop duration={600} onClick={clickBackTop} />
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
          {connection !== 500 ? (
            <LoadRoutes routes={routes && routes} />
          ) : (
            <Error status={500} />
          )}
        </Content>
        <div className="layout-basic__footer">{isLoading && <Footer />}</div>
      </Suspense>
    </div>
  );
}
