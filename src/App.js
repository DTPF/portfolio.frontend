import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import { Notifications } from 'react-push-notification';
import { Spin } from "antd";

import "./App.scss";

function App() {
  const [spin, setSpin] = useState(false);
  
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
          tipe="Cargando usuarios"
          style={{
            textAlign: "center",
            width: "100%",
            padding: "20px",
            marginTop: "200px"
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

export default App;
