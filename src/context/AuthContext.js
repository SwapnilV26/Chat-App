import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [sideWidth, setSideWidth] = useState(0);
  const [chatWidth, setChatWidth] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setSideWidth('100%')
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, chatWidth, setChatWidth, sideWidth, setSideWidth }}>
      {children}
    </AuthContext.Provider>
  );
};