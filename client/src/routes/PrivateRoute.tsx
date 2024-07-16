import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
