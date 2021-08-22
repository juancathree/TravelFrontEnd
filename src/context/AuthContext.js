import { useState, createContext } from "react";

export const Context = createContext();

export default function AuthContext({ children }) {
  const [jwt, setJWT] = useState(() => window.localStorage.getItem("jwt"));

  return (
    <Context.Provider value={{ jwt, setJWT }}>{children}</Context.Provider>
  );
}
