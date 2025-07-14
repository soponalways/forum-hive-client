import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Forbidden from "../pages/Forbidden/Forbidden";
import React from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'forbidden',
        Component: Forbidden
      },
      {
        path: 'Join-us', 
        Component: React.lazy(() => import('../pages/Authentication/JoinUs'))
      }, 
      {
        path: 'signup',
        Component: React.lazy(() => import('../pages/Authentication/Signup'))
      }
    ]
  },
  {
    path: 'dashboard', 
    element: <PrivateRoute ><DashboardLayout /></PrivateRoute>, 
    children: [
      {
        index: true,
        Component: Dashboard
      },
      
    ]
  }
]);