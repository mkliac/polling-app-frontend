import { useContext, useEffect, useLayoutEffect, useState } from "react"
import UserService from "../services/UserService";
import { User } from "../models/UserModel";
import { Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import TokenService from "../services/TokenService";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
    const [user, setUser] = useState<User>();
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

    const getUser = () => {
        UserService.login()
        .then(data => {
            setUser(data);
            setIsLoggedIn(true);
        })
        .catch(() => {
            setUser(null);
            setIsLoggedIn(false);
        });
    };

    const onError = () => {
        console.log("Failed to login");
      };

    const onSuccess = (res) => {
        TokenService.saveToken(res.credential);
        getUser();
    }

    useLayoutEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            {!isLoggedIn ? 
                <GoogleLogin 
                    onSuccess={onSuccess} 
                    onError={onError} 
                /> :
                <Navigate to={localStorage.getItem("redirect") || "/create-poll"} />
            }
        </div>
    );
}

export default LoginForm