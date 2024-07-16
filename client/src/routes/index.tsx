import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/privateLayout";
import DashBoard from "../pages/privatePage/dashborad";
import AdminAccount from "../pages/privatePage/account";
import AdminStudent from "../pages/privatePage/student";
import Login from "../pages/publicPage/login";
import NotFound from "../pages/publicPage/notFound";

const PublicRouters = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const PrivateRouters = [
  {
    path: "/admin",
    element: <PrivateRoute element={<AdminLayout />} />, // Sử dụng AdminLayout
    children: [
      {
        element: <DashBoard />,
        index: true,
      },
      {
        path: "account",
        element: <AdminAccount />,
      },
      {
        path: "student",
        element: <AdminStudent />,
      },
    ],
  },
];

const router = createBrowserRouter([...PublicRouters, ...PrivateRouters]);

export default router;
