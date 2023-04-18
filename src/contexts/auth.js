import { createContext, useEffect, useState } from "react";
import api from '../service/api.js';

export const AuthContext = createContext({});

export const AuthProvider = function({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, token) => {
    localStorage.setItem("user_token", JSON.stringify({ email, token }));
    setUser({ email, token });

    return;
    
  };

  const signup = (name, email, password) => {
     
    api.post(`/users`, {
      name: name,
      email: email,
      password: password,
      perfis: ["CLIENTE"]
    }).then(() => {})

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;