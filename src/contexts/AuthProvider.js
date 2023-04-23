import { createContext, useEffect, useState } from "react";
import api from '../service/api.js';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const signup = async (name, email, password) => {
    try {
      api.post(`/users`, {
        name: name,
        email: email,
        password: password,
        perfis: ["CLIENTE"]
      }).then(() => {})
      } catch (error) {
        console.error('Erro ao criar conta do usuário:', error);
      }
  };

  const values = {
    user,
    signup,
  };
  

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
