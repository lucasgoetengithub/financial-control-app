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

  const signin = async(email, token) => {
    localStorage.setItem("user_token", JSON.stringify({ email, token }));
    setUser({ email, token });
    
    return;
  }

  const values = {
    user,
    signup,
    signin,
  };
  

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
