import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthorizedUser = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  // console.log("Token:", token); // Debug statement
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
