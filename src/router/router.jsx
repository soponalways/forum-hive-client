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
import Comment from "../pages/Dashboard/User/Comment/Comment";
import AdminRoute from "../routes/AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ReportedActivities from "../pages/Dashboard/ReportedActivities/ReportedActivities";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import Profile from "../pages/Dashboard/shared/Profile";
import UpdateProfile from "../pages/Dashboard/shared/UpdateProfile";
import ContactUs from "../pages/ContactUs/ContactUs";

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
        path: '/contact-us',
        Component: ContactUs
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
        element: <Profile></Profile>
      },
      {
        path: 'profile/update',
        element: <UpdateProfile></UpdateProfile>
      },
      {
        path: 'comment/:postId',
        element: <Comment></Comment>
      },
      // Admin Route
      {
        path: 'manage-users',
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: 'reported-comments',
        element: <AdminRoute>
          <ReportedActivities></ReportedActivities>
        </AdminRoute>
      },
      {
        path: 'announcement',
        element: <AdminRoute>
          <MakeAnnouncement></MakeAnnouncement>
        </AdminRoute>
      }
    ]
  }
]);