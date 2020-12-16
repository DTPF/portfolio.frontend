import React, { useState, Suspense, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout, Tag } from "antd";
import useAuth from "../hooks/useAuth";
import { useDBConnectionStatus, useNavigatorIsOnline } from "../hooks/useConnection";
import useMessagesUnreadLength from "../webSockets/hooks/useMessagesUnreadLength";
import AdminSignIn from "../pages/Admin/SignIn";
import { Notifications } from "react-push-notification";
import { StopOutlined } from "@ant-design/icons";
import "./LayoutAdmin.scss";
const MenuTop = lazy(() => import("../components/Admin/MenuTop"));
const MenuSider = lazy(() => import("../components/Admin/MenuSider"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));
const Error = lazy(() => import("../pages/Errors"));

export default function LayoutAdmin(props: any) {
  const { routes } = props;
  const isNavigatorOnline = useNavigatorIsOnline();
  const connectionStatus = useDBConnectionStatus();
  const { user, isLoading } = useAuth();
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/ad1988/login" component={AdminSignIn} />
        <Redirect to="/ad1988/login" />
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <>
        {!isNavigatorOnline && (
          <Tag className="offline-message" icon={<StopOutlined />}>
            Offline
          </Tag>
        )}
        <RenderLayoutAdmin routes={routes} connectionStatus={connectionStatus} />
      </>
    );
  }
  return null;
}

function RenderLayoutAdmin(props: any) {
  const { routes, connectionStatus } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const messagesUnreadLength = useMessagesUnreadLength();
  const { Header, Content, Footer } = Layout;
  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };
  return (
    <Layout onClick={closeMenu}>
      <Notifications />
      <Suspense fallback={<></>}>
        <MenuSider menuCollapsed={menuCollapsed} messagesUnreadLength={messagesUnreadLength} />
        <Layout className="layout-admin">
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            {!connectionStatus || connectionStatus === 200 ? (
              <LoadRoutes routes={routes && routes} />
            ) : (
              <Error status={500} />
            )}
          </Content>
          <Footer className="layout-admin__footer">
            David Thomas Pizarro Frick
          </Footer>
        </Layout>
      </Suspense>
    </Layout>
  );
}
