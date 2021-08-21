import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("../components/Home/index.js"));
const Login = lazy(() => import("../components/Login/index.js"));
const Signup = lazy(() => import("../components/Signup/index.js"));

export default function AppRouter() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <Route path="/login" render={() => <Login />} exact />
          <Route path="/signup" render={() => <Signup />} exact />
          <Route path="*" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
