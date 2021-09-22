import AppRouter from 'routers/AppRouter';
import AuthProvider from 'context/AuthContext';
import { NotificationContainer } from 'react-notifications';
import { IKContext } from 'imagekitio-react';

export default function App() {
   return (
      <AuthProvider>
         <IKContext urlEndpoint="https://ik.imagekit.io/aacivfepey/">
            <NotificationContainer />
            <AppRouter />
         </IKContext>
      </AuthProvider>
   );
}
