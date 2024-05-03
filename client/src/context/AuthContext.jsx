import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

    // console.log("Register info: ", registerInfo);
    // console.log("Login info: ", loginInfo);


  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      // Make sure that we don't have an error when we are loading
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      // This is when our register has stopped
      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));

      setUser(response);
    },
    [registerInfo]
  );


  const logoutUser = useCallback(async (e) => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);


  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      // Make sure that we don't have an error when we are loading
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      // This is when our Login has stopped
      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));

      setUser(response);

    },
    [loginInfo]
  );


  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginInfo,
        updateLoginInfo,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
