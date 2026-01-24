import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useLoadMeQuery } from "./api/authApi";
import BrowseBusinesses from "./pages/BrowseBusinesses ";
import ListBusiness from "./pages/ListBusiness";
import BusinessDescription from "./pages/BusinessDescription";
import MyProfile from "./pages/MyProfile";
import EditBusiness from "./pages/EditBusiness";
import Search from "./components/Search";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
  { path: "/business", element: <BrowseBusinesses /> },
  { path: "/ListYourBiz", element: <ListBusiness /> },
  {
    path: "/business/description/:id",
    element: <BusinessDescription />,
  },
  {
    path: "/profile",
    element: <MyProfile />,
  },
  {
    path: "/edit/:id",
    element: <EditBusiness />,
  },
  {
    path:"/search",
    element:<Search/>
  }
]);
const App = () => {
  const { data, isLoading, isError } = useLoadMeQuery();

  if (isLoading) return <p>Loading user...</p>;
  return <RouterProvider router={router} />;
};

export default App;
