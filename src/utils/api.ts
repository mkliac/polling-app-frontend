import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../services/TokenService";

const BACKEND_URL = "https://voting-app-backend-dev.onrender.com";
// const BACKEND_URL = "http://localhost:8080"
const REQUEST_TIMEOUT = 600000;
export const getApi = async (url: string, params?: object, data?: object) => {
    const res = await axios.get(BACKEND_URL + url, {
        params,
        data,
        timeout: REQUEST_TIMEOUT,
        headers: {
            Authorization: `Bearer ${TokenService.getToken()}`
        }
    })

    return res.data;
}

export const postApi = async (url: string, data?: object, params?: object) => {
    const res = await axios.post(BACKEND_URL + url, data, {
        params,
        timeout: REQUEST_TIMEOUT,
        headers: {
            Authorization: `Bearer ${TokenService.getToken()}`
        }
    })

    return res.data;
}

export const deleteApi = async (url: string, data?: object) => {
    const res = await axios.delete(BACKEND_URL + url, {
        data,
        timeout: REQUEST_TIMEOUT,
        headers: {
            Authorization: `Bearer ${TokenService.getToken()}`
        }
    })

    return res.data;
}

// PUT API is not working, use POST for now

export const putApi = async (url: string, params?: object) => {
    const res = await axios.put(BACKEND_URL + url, {
        // params,
        timeout: REQUEST_TIMEOUT,
        headers: {
            Authorization: `Bearer ${TokenService.getToken()}`
        }
    })

    return res.data;
}