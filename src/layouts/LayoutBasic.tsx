import React, { useState, Suspense, lazy } from "react";
import useConnection from "../hooks/useConnection";
import { gaEvent } from "../utils/analytics.js";
import { Layout, BackTop, Tag, Alert } from "antd";
import { StopOutlined } from "@ant-design/icons";
import "./LayoutBasic.scss";
import Theme from "../components/UI/Theme";
import MenuTop from "../components/Web/Layout/MenuTop";
import MenuSider from "../components/Web/Layout/MenuSider";
import Footer from "../components/Web/Layout/Footer";
import LoadRoutes from "../providers/LoadRoutes";
const Error = lazy(() => import("../pages/Errors"));

export default function LayoutBasic(props: any) {
  const { routes } = props;
  const { connection, isOnline } = useConnection();
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const clickBackTop = () => {
    gaEvent("click_back_top", "clicks", "UI Clicks", true);
  };
  return (
    <>
      <RenderLayoutBasic
        routes={routes}
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
        connection={connection}
      />
      <Theme />
      <BackTop duration={600} onClick={() => clickBackTop} />
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
    </>
  );
}

function RenderLayoutBasic(props: any) {
  const { routes, menuCollapsed, setMenuCollapsed, connection } = props;
  const { Content } = Layout;
  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };
  return (
    <div className="layout-basic">
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
      <Content onClick={closeMenu} className="layout-basic__content">
        {!connection || connection === 200 ? (
          <LoadRoutes routes={routes && routes} />
        ) : (
          <Suspense fallback={<></>}>
            <Error status={500} />
          </Suspense>
        )}
      </Content>
      <footer className="layout-basic__footer">
        <Footer />
      </footer>
    </div>
  );
}
