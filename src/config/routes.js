// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";

// Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

// Other
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/admin",
        exact: true,
        component: AdminHome,
      },
      {
        path: "/admin/login",
        exact: true,
        component: AdminSignIn,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true
      },
      {
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/home",
        exact: true,
        component: Home,
      },
      {
        path: "/contact",
        exact: true,
        component: Contact,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
