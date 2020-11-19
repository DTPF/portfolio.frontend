import React, { useState, Suspense, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout, Tag } from "antd";
import useAuth from "../hooks/useAuth";
import useConnection from "../hooks/useConnection";
import AdminSignIn from "../pages/Admin/SignIn";
import { Cookies } from "react-cookie";
import { Notifications } from "react-push-notification";
import { StopOutlined } from "@ant-design/icons";
import "./LayoutAdmin.scss";
const MenuTop = lazy(() => import("../components/Admin/MenuTop"));
const MenuSider = lazy(() => import("../components/Admin/MenuSider"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));
const Error = lazy(() => import("../pages/Errors"));
const CookiesConsent = lazy(() => import("../components/UI/CookiesConsent"));

export default function LayoutAdmin(props: any) {
  const { routes } = props;
  const { connection, isOnline } = useConnection();
  const { user, isLoading } = useAuth();
  const cookie = new Cookies();
  const _gaCookies = cookie.get("_gaCookies");
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/ad1988/login" component={AdminSignIn} />
        <Redirect to="/ad1988/login" />
        {!_gaCookies && (
          <Suspense fallback={<></>}>
            <CookiesConsent />
          </Suspense>
        )}
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <>
        {!isOnline && (
          <Tag className="offline-message" icon={<StopOutlined />}>
            Offline
          </Tag>
        )}
        {!_gaCookies && (
          <Suspense fallback={<></>}>
            <CookiesConsent />
          </Suspense>
        )}
        <RenderLayoutAdmin routes={routes} connection={connection} />
      </>
    );
  }
  return null;
}

function RenderLayoutAdmin(props: any) {
  const { routes, connection } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
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
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout className="layout-admin">
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            {!connection || connection === 200 ? (
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
