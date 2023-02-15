import axioInstance from "../axioInstance";

export const filesApiEndPoint = "files";

export const getFiles = (token: string) => token ? axioInstance.get(`${filesApiEndPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data) : [];

export const getDFiles = (id : number, token: string) => axioInstance.get(`${filesApiEndPoint}/d/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
