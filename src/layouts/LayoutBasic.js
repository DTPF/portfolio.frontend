import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutBasic.scss";

export default function LayoutBasic({ routes }) {
//   const { routes } = props;
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <h2>Menú Sider Basic User</h2>
      <Layout>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>David Thomas Pizarro Frick</Footer>
      </Layout>
    </Layout>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
}