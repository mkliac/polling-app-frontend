import { useEffect, useState } from "react"
import UserService from "../services/UserService";
import { User } from "../models/UserModel";
import { Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import TokenService from "../services/TokenService";

const LoginForm = () => {
    const [user, setUser] = useState<User>();
    const getUser = () => {
        UserService.saveUser()
        .then(data => setUser(data))
        .catch(() => setUser(null));
    };

    const onError = () => {
        console.log("Failed to login");
      };

    const onSuccess = (res) => {
        TokenService.saveToken(res.credential);
        getUser();
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            {user == undefined ? 
                <GoogleLogin 
                    onSuccess={onSuccess} 
                    onError={onError} 
                /> :
                <Typography>{user.username}</Typography>
            }
        </div>
    );
}

export default LoginForm