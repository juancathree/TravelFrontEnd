import { useState, createContext, memo } from 'react';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

export default memo(function AuthProvider({ children }) {
   const cookie = new Cookies();
   const [jwt, setJWT] = useState(() => cookie.get('travelapp'));

   return (
      <AuthContext.Provider value={{ jwt, setJWT }}>
         {children}
      </AuthContext.Provider>
   );
});
