import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Login = lazy(() => import('components/Login'));
const Signup = lazy(() => import('components/Signup'));
const Home = lazy(() => import('components/Home'));

export default function AppRouter() {
   return (
      <Suspense fallback={<h1>Loading...</h1>}>
         <BrowserRouter>
            <Switch>
               <PrivateRoute path="/" component={Home} exact />
               <PrivateRoute path="/travels" component={Home} exact />
               <PrivateRoute path="/user" component={Home} exact />
               <Route path="/login" component={Login} exact />
               <Route path="/signup" component={Signup} exact />
               <PrivateRoute path="/:id" component={Home} exact />
               <Route path="*" />
            </Switch>
         </BrowserRouter>
      </Suspense>
   );
}
