import { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../Navbar/index.js";

const Cities = lazy(() => import("../Cities/index.js"));
const Travels = lazy(() => import("../Travels/index.js"));
const User = lazy(() => import("../User/index.js"));

export default function Home() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Cities} exact />
        <Route path="/travels" component={Travels} exact />
        <Route path="/user" component={User} exact />
      </Switch>
    </>
  );
}
