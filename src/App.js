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
            padding: "20px",
            marginTop: "200px",
            color: "white"
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
