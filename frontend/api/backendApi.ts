import axios from "axios";
import axioInstance from "./axioInstance";

export const googleCallback = (query : string) => {
    axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials : true}).then(() => {
        return axioInstance.get(`auth/google/callback?${query}`);
    })
}

export const googleLogin = () => axioInstance.get('auth/google');