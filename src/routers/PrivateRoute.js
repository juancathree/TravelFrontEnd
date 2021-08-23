import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isLogged } = useAuth();
  return (
    <Route {...rest}>
      {isLogged ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
}
