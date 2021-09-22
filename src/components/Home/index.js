import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import AppProvider from 'context/AppContext';

const Cities = lazy(() => import('components/Cities'));
const Travels = lazy(() => import('components/Travels'));
const User = lazy(() => import('components/User'));
const City = lazy(() => import('components/City'));
const Travel = lazy(() => import('components/Travel'));
const NewTravel = lazy(() => import('components/NewTravel'));
const Expenses = lazy(() => import('components/Expenses'));
const EditTravel = lazy(() => import('components/EditTravel'));
const Invite = lazy(() => import('components/Invite'));

export default function Home() {
   return (
      <AppProvider>
         <Navbar />
         <Switch>
            <Route path="/cities" component={Cities} exact />
            <Route path="/travels" component={Travels} exact />
            <Route path="/user" component={User} exact />
            <Route path="/cities/:id" component={City} exact />
            <Route path="/travels/:id/expenses" component={Expenses} exact />
            <Route path="/travels/:id/edit" component={EditTravel} exact />
            <Route path="/travels/:id/invite" component={Invite} exact />
            <Route path="/travels/:id" component={Travel} exact />
            <Route path="/newTravel" component={NewTravel} exact />
         </Switch>
      </AppProvider>
   );
}
