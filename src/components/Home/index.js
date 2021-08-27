import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import AppProvider from 'context/AppContext';
import { IKContext } from 'imagekitio-react';

const Cities = lazy(() => import('components/Cities'));
const Travels = lazy(() => import('components/Travels'));
const User = lazy(() => import('components/User'));
const City = lazy(() => import('components/City'));

export default function Home() {
   return (
      <AppProvider>
         <Navbar />
         <IKContext urlEndpoint="https://ik.imagekit.io/aacivfepey/">
            <Switch>
               <Route path="/" component={Cities} exact />
               <Route path="/travels" component={Travels} exact />
               <Route path="/user" component={User} exact />
               <Route path="/:id" component={City} exact />
            </Switch>
         </IKContext>
      </AppProvider>
   );
}
