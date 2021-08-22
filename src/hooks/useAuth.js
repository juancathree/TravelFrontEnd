import { useContext, useCallback, useState } from "react";
import { Context } from "../context/AuthContext";
import loginService from "../services/login";

export default function useAuth() {
  const { jwt, setJWT } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ email, password }) => {
      setState({ loading: true, error: false });
      loginService({ email, password })
        .then((jwt) => {
          window.localStorage.setItem("jwt", jwt);
          setState({ loading: false, error: false });
          setJWT(jwt);
        })
        .catch((err) => {
          window.localStorage.removeItem("jwt");
          setState({ loading: false, error: true });
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem("jwt");
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
