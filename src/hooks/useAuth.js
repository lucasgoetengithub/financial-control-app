import { useContext } from "react";
import { AuthContext } from "../contexts/auth.js";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
