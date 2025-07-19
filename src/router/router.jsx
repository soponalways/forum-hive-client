import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Forbidden from "../pages/Forbidden/Forbidden";
import React from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPost from "../pages/Dashboard/User/AddPost";
import MyPosts from "../pages/Dashboard/User/MyPosts";
import PostDetails from "../pages/PostDetails/PostDetails";
import MemberShip from "../pages/MemberShip/MemberShip";
import PaymentForm from "../pages/MemberShip/PaymentForm";
import MyProfile from "../pages/Dashboard/User/MyProfile";

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
      }, 
      {
        path: '/post/:PostId', 
        Component: PostDetails
      }, 
      {
        path: '/membership', 
        element: <PrivateRoute>
          <MemberShip></MemberShip>
        </PrivateRoute>
      }, 
      {
        path: '/payment', 
        element: <PrivateRoute>
          <PaymentForm></PaymentForm>
        </PrivateRoute>
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
      {
        path: 'add-post', 
        element: <AddPost />, 
      }, 
      {
        path: 'my-posts',
        element: <MyPosts />, 
      },
      {
        path: 'profile', 
        element: <MyProfile></MyProfile>
      }
      
    ]
  }
]);