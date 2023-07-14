import { createBrowserRouter } from "react-router-dom";
import LayoutAuthenticate from "./layouts/LayoutAuthenticate";
import LayoutHome from "./layouts/LayoutHome";
import Home from "./pages/home/Home";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { lazy, Suspense } from "react";

const Admin = lazy(()=>import("./pages/admin/Admin"))
const Login = lazy(()=>import("./pages/auth/Login"))
const Register = lazy(()=>import("./pages/auth/Register"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LayoutAuthenticate />,
    children: [
      {
        path: "/auth/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Admin />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <LayoutAuthenticate />,
  },
]);

export default router;
