import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import { Notifications } from 'react-push-notification';
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import "./App.scss";

export default function App() {
  const [spin, setSpin] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setSpin(true);
    }
    return () => { unmounted = true }
  }, [spin]);

  return (
    <AuthProvider>
      <Notifications />
      {!spin ? (
        <Spin
          indicator={antIcon}
          style={{
            textAlign: "center",
            width: "100%",
            height: "100vh",
            padding: "20px",
            paddingTop: "200px",
            color: "#E4E4E4",
            backgroundColor: "#E4E4E4"
          }}
        />
      ) : (
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
      )}
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}
