import { useState, createContext, memo } from 'react';

export const AuthContext = createContext();

export default memo(function AuthProvider({ children }) {
   const [jwt, setJWT] = useState(() => {
      const re = new RegExp(`(?<=travelapp=)[^;]*`);
      try {
         return document.cookie.match(re)[0];
      } catch {
         return null;
      }
   });

   return (
      <AuthContext.Provider value={{ jwt, setJWT }}>
         {children}
      </AuthContext.Provider>
   );
});
