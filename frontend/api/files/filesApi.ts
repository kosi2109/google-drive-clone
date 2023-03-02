import axioInstance from "../axioInstance";

export const filesApiEndPoint = "files";

export const getFiles = () => axioInstance.get(`${filesApiEndPoint}`)
    .then((res) => res.data);

export const getDFiles = (id : number) => axioInstance.get(`${filesApiEndPoint}/d/${id}`)
    .then((res) => res.data)
