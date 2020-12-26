import React, { useState } from "react";
import useConnection from "../hooks/useConnection";
import { gaEvent } from "../utils/analytics.js";
import { BackTop, Tag, Alert } from "antd";
import { StopOutlined } from "@ant-design/icons";
import "./LayoutBasic.scss";
import Theme from "../components/UI/Theme";
import MenuTop from "../components/Web/Layout/MenuTop";
import MenuSider from "../components/Web/Layout/MenuSider";
import Footer from "../components/Web/Layout/Footer";
import LoadRoutes from "../providers/LoadRoutes";

export default function LayoutBasic(props: any) {
  const { routes } = props;
  const { connectionStatus, isNavigatorOnline } = useConnection();
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
      />
      <Theme />
      <BackTop duration={600} onClick={() => clickBackTop} />
      {(!isNavigatorOnline || connectionStatus === 500) && (
        <>
          <Tag className="offline-message" icon={<StopOutlined />}>
            Offline
          </Tag>
          <Alert
            className="offline-message-alert"
            message={
              !isNavigatorOnline
                ? "Comprueba tu conexión a internet para visualizar ver todo el contenido."
                : "Hay problemas con el servidor. La página se reiniciará cuando se solucione el problema."
            }
            type="info"
            closeText="Cerrar aviso"
          />
        </>
      )}
    </>
  );
}

function RenderLayoutBasic(props: any) {
  const { routes, menuCollapsed, setMenuCollapsed } = props;
  const closeMenu = () => {
    !menuCollapsed && setMenuCollapsed(true);
  };
  return (
    <div className="layout-basic unselectable">
      <div className="layout-basic__header-box"></div>
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
      <div onClick={closeMenu} className="layout-basic__content">
        <LoadRoutes routes={routes && routes} />
      </div>
      <div className="layout-basic__footer">
        <Footer />
      </div>
    </div>
  );
}
