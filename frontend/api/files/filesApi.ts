import axioInstance from "../axioInstance";

export const filesApiEndPoint = 'files';

export const getFiles = async (token : string) => {
    const response = await axioInstance.get(`${filesApiEndPoint}`, {headers : {
        "Authorization" : `Bearer ${token}`
    }})

    return response.data;
};