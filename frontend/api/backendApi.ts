import axios from "axios";
import axioInstance from "./axioInstance";

export const googleUserLogin = (data : any) => {
    return axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials : true}).then(() => {
        return axioInstance.post(`auth/google`, data).then((res) => res);
    })
}
