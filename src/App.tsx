import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import ConnectionProvider from "./providers/ConnectionProvider";
import MainMenuProvider from "./providers/MainMenuProvider";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { message } from "antd";
import "./App.scss";

export default function App() {
  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration: any) => {
        const reload = () => {
          if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }
          window.location.reload();
        };
        message.info("Nueva versión. Actualizando la web", 3, reload);
      },
    });
  }, []);
  return (
    <AuthProvider>
      <ConnectionProvider>
        <MainMenuProvider>
          <Router>
            <Switch>
              {routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
            </Switch>
          </Router>
        </MainMenuProvider>
      </ConnectionProvider>
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
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
