import { memo } from "react";
import AppRouter from "./routers/AppRouter";
import AuthContext from "./context/AuthContext";

export default memo(function App() {
  return (
    <AuthContext>
      <AppRouter />
    </AuthContext>
  );
});
