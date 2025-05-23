import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const Login = (user) => {
        setAuthUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("authUser", user);
    };

    const Logout = () => {
        setAuthUser("");
        setIsLoggedIn(false);
        localStorage.removeItem("authUser");
        useNavigate;
    };

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        Login,
        Logout
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
