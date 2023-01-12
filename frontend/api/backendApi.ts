import axios from "axios";
import axioInstance from "./axioInstance";

export const getCSRFCookie = ()=> axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials : true});

export const googleUserLogin = (data : any) => axioInstance.post(`auth/google`, data);
