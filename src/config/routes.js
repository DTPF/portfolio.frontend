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
import Courses from "../pages/Courses";

// Other
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/ad1988",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/ad1988",
        exact: true,
        component: AdminHome,
      },
      {
        path: "/ad1988/login",
        exact: true,
        component: AdminSignIn,
      },
      {
        path: "/ad1988/users",
        component: AdminUsers,
        exact: true
      },
      {
        path: "/ad1988/menu",
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
        path: "/courses",
        exact: true,
        component: Courses
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
