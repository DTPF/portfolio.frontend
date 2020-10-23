import React, { Suspense, lazy } from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/png/logo256.png";
import { getAccessTokenApi } from "../../../api/auth";
import "./SignIn.scss";
const LoginForm = lazy(() => import('../../../components/Admin/LoginForm'));
const RegisterForm = lazy(() => import('../../../components/Admin/RegisterForm'));

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  if (getAccessTokenApi()) {
    return <Redirect to="/ad1988" />;
  }
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="David Thomas Pizarro Frick" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              <Suspense fallback={<></>}>
                <LoginForm />
              </Suspense>
            </TabPane>
            <TabPane tab={<span>Nuevo usuario</span>} key="2">
              <Suspense fallback={<></>}>
                <RegisterForm />
              </Suspense>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}