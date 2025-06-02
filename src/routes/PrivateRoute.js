import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN } from "./routes";

const PrivateRoute = (props) => {
  const { children, layout: Layout } = props;
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Layout>{children}</Layout> : <Navigate to={LOGIN} />;
};

const GeneralRoute = (props) => {
  const { children, layout: Layout } = props;
  return <Layout>{children}</Layout>;
};

export { PrivateRoute, GeneralRoute };
