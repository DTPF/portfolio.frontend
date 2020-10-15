import React, { useState, Suspense, lazy } from "react";
import { useNearScreen } from "../hooks/useNearScreen";
import { Layout } from "antd";
import "./LayoutBasic.scss";
const MenuTop = lazy(() => import("../components/Web/MenuTop"));
const MenuSider = lazy(() => import("../components/Web/MenuSider"));
const Footer = lazy(() => import("../components/Web/Footer"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));

export default function LayoutBasic({ routes }) {
  const [show, el] = useNearScreen();
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
          />
        </div>
        <Content className="layout-basic__content">
          <LoadRoutes routes={routes && routes} />
        </Content>
        <div className="layout-basic__footer" ref={el}>
          {show && (
            <Suspense fallback={<></>}>
              <Footer />
            </Suspense>
          )}
        </div>
      </Suspense>
    </div>
  );
}