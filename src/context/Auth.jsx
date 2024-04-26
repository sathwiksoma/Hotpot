import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      //in home page we will ee our userobject details but when we refresh it it wont be seen so first we stored them in local storage and again accessing them from local storage
      const parseData = JSON.parse(data); //but it is executing continously to stop it go to 20 line
      setAuth({
        ...auth,
        user: parseData.userName,
        token: parseData.token,
      });
    }
    //eslink-disable-next-line  (below box brackets used for stopping infinity execution)
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };