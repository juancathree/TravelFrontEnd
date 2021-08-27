import { useContext, useCallback, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import loginService from 'services/login';
import Cookies from 'universal-cookie';

export default function useAuth() {
   const { jwt, setJWT } = useContext(AuthContext);
   const [state, setState] = useState({ loading: false, error: false });

   const login = useCallback(
      ({ email, password }) => {
         setState({ loading: true, error: false });
         const cookies = new Cookies();
         loginService({ email, password })
            .then((jwt) => {
               let d = new Date();
               d.setTime(d.getTime() + 120 * 24 * 60 * 60 * 1000);
               cookies.set('travelapp', jwt, {
                  path: '/',
                  sameSite: 'Lax',
                  secure: true,
                  expires: d,
               });
               setState({ loading: false, error: false });
               setJWT(jwt);
            })
            .catch((err) => {
               cookies.remove('travelapp');
               setState({ loading: false, error: true });
            });
      },
      [setJWT]
   );

   const logout = useCallback(() => {
      const cookies = new Cookies();
      cookies.remove('travelapp');
      setJWT(null);
   }, [setJWT]);

   return {
      isLogged: Boolean(jwt),
      isLoginLoading: state.loading,
      hasLoginError: state.error,
      login,
      logout,
   };
}
