import React from "react";
import AppRouter from "./routers/AppRouter";
import AuthContext from "./context/AuthContext";

function App() {
  return (
    <AuthContext>
      <AppRouter />
    </AuthContext>
  );
}

export default App;
