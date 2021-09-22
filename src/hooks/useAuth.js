import { useContext, useCallback, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import loginService from 'services/login';
import signupService from 'services/signup';

export default function useAuth() {
   const { jwt, setJWT } = useContext(AuthContext);
   const [state, setState] = useState({
      loading: false,
      error: false,
      isRegister: false,
   });

   const login = useCallback(
      ({ email, password }) => {
         setState({ loading: true, error: false });
         loginService({ email, password })
            .then((jwt) => {
               let d = new Date();
               d.setTime(d.getTime() + 120 * 24 * 60 * 60 * 1000);
               document.cookie =
                  'travelapp=' + jwt + ';expires=' + d + ';path=/';
               setState({ loading: false, error: false });
               setJWT(jwt);
            })
            .catch((err) => {
               setState({ loading: false, error: true });
            });
      },
      [setJWT]
   );

   const signup = useCallback(({ name, email, password }) => {
      setState({ loading: true, error: false });
      signupService({ name, email, password })
         .then((response) => {
            setState({ loading: false, error: false, isRegister: true });
         })
         .catch((err) => {
            setState({ loading: false, error: true, isRegister: false });
         });
   }, []);

   return {
      isLogged: Boolean(jwt),
      isLoading: state.loading,
      hasError: state.error,
      isRegister: state.isRegister,
      login,
      signup,
   };
}
