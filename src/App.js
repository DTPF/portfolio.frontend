import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import { Notifications } from "react-push-notification";
import "./App.scss";

export default function App() {
  return (
    <AuthProvider>
      <Notifications />
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

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}
