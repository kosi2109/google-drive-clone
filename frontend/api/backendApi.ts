import axios from "axios";
import axioInstance from "./axioInstance";

export const googleApiCallback = (query : string) => {
    return axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials : true}).then(() => {
        return axioInstance.get(`auth/google/callback?${query}`).then((data) => data);
    })
}

export const googleLogin = () => axioInstance.get('auth/google');