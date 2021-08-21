import { Route, Redirect } from "react-router-dom";

const user = null;

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
  );
}
