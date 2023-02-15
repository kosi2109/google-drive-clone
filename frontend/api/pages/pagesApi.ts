import axioInstance from "../axioInstance";

export const filesApiEndPoint = "pages";

export const getPageData = (page: string, token: string) =>
  token
    ? axioInstance
        .get(`${filesApiEndPoint}/${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
    : [];

export const getFolderById = (id: any, token: string) =>
  token
    ? axioInstance
        .get(`${filesApiEndPoint}/folder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
    : [];
    
export const createFolder = (name: any, token: string) =>
   axioInstance
        .post(`folders/create`, {name},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
    ;
