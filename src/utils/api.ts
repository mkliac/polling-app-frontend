import axios from "axios";
import TokenService from "../services/TokenService";

const BACKEND_URL = "https://voting-app-backend-dev.onrender.com";
export const getApi = async (url: string, params?: object, data?: object) => {
    const res = await axios.get(BACKEND_URL + url, {
        params,
        data,
        timeout: 600000,
        headers: {
            Authorization: `Bearer ${TokenService.getToken()}`
        }
    })

    return res.data;
}