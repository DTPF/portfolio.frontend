// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminContactMessages from "../pages/Admin/ContactMessages";
import AdminCourses from "../pages/Admin/Courses";

// Pages
import Home from "../pages/Web/Home";
import Contact from "../pages/Web/AboutMe";
import Courses from "../pages/Web/Education";

// Other
import Error404 from "../pages/Errors/Error404";

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
        exact: true,
        component: AdminMenuWeb
      },
      {
        path: "/ad1988/contact-messages",
        exact: true,
        component: AdminContactMessages
      },
      {
        path: "/ad1988/courses",
        exact: true,
        component: AdminCourses
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
        path: "/about-me",
        exact: true,
        component: Contact,
      },
      {
        path: "/education",
        exact: true,
        component: Courses
      },
      {
        path: "/education/:url",
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
