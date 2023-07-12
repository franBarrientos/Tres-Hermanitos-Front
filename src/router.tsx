import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import LayoutAuthenticate from "./layouts/LayoutAuthenticate";
import LayoutHome from "./layouts/LayoutHome";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Admin from "./pages/admin/Admin";
import LayoutAdmin from "./layouts/LayoutAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ],
  },
  {
    path: "/auth",
    element: <LayoutAuthenticate />,
    children: [
      {
        path:"/auth/login",
        element: <Login />,
      },
      {
        path:"/auth/register",
        element: <Register />,
      }
    ],
  },
  {
    path:"/admin",
    element: <LayoutAdmin />,
    children:[
      {
        index:true,
        element:<Admin/>
      }
    ]
  }
]);

export default router;
