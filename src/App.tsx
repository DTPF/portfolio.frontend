import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import "./App.scss";
import { notification } from "antd";
import * as serviceWorker from "./serviceWorker";

export default function App() {
  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration: any) => {
        const reload = () => {
          if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }
          window.location.reload();
        };
        const args = {
          message: "Nueva actualización de la web",
          duration: 0,
          closeIcon: "Recargar",
          onClose: () => {reload()}
        };
        notification.open(args);
      },
    });
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouteWithSubRoutes(route: {
  path: string;
  exact: boolean;
  routes: {};
  component: any;
}) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}
