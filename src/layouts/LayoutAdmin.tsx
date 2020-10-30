import React, { useState, Suspense, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import AdminSignIn from "../pages/Admin/SignIn";
import { Notifications } from "react-push-notification";
import "./LayoutAdmin.scss";
const MenuTop = lazy(() => import("../components/Admin/MenuTop"));
const MenuSider = lazy(() => import("../components/Admin/MenuSider"));
const LoadRoutes = lazy(() => import("../providers/LoadRoutes"));

export default function LayoutAdmin(props: any) {
  const { routes } = props;  
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();
  const closeMenu = () => {
    if (menuCollapsed === false) {
      setMenuCollapsed(true);
    }
  };
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
      <Layout onClick={closeMenu}>
        <Notifications />
        <Suspense fallback={<></>}>
          <MenuSider menuCollapsed={menuCollapsed} />
          <Layout
            className="layout-admin"
            style={{ marginLeft: menuCollapsed ? "0px" : "205px" }}
          >
            <Header className="layout-admin__header">
                <MenuTop
                  menuCollapsed={menuCollapsed}
                  setMenuCollapsed={setMenuCollapsed}
                />
            </Header>
            <Content className="layout-admin__content">
              <LoadRoutes routes={routes} />
            </Content>
            <Footer className="layout-admin__footer">
              David Thomas Pizarro Frick
            </Footer>
          </Layout>
        </Suspense>
      </Layout>
    );
  }
  return null;
}
