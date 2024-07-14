import App from "./App";
import Login from "./pages";

import {
    createBrowserRouter,
  } from "react-router-dom";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <div></div>,
    },
    {
        path:"/login",
        element: <div></div>,
    },
  ]);