import axios from "axios";
import axioInstance from "./axioInstance";

export const getCSRFCookie = ()=> axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials : true});

export const googleUserLogin = (data : any) => axioInstance.post(`auth/google`, data);

export const getUsers = (token : string) => axioInstance.get(`users`, {headers : {
    "Authorization" : `Bearer ${token}`
}});

export const getFiles = (token : string) => axioInstance.get(`files`, {headers : {
    "Authorization" : `Bearer ${token}`
}});
