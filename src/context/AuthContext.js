import { useState, createContext } from "react";
import Cookies from "universal-cookie";

export const Context = createContext();

export default function AuthContext({ children }) {
  const cookie = new Cookies();
  const [jwt, setJWT] = useState(() => cookie.get("travelapp"));

  return (
    <Context.Provider value={{ jwt, setJWT }}>{children}</Context.Provider>
  );
}
