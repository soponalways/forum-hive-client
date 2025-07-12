import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Forbidden from "../pages/Forbidden/Forbidden";
import React from "react";

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
      }
    ]
  },
]);