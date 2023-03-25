import axios from "axios";

export default axios.create({
    baseURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    headers : {
        "Content-Type": "application/json",
        'Accept': "application/json"
    },
    withCredentials : true
})