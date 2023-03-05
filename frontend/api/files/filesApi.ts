import axioInstance from "../axioInstance";

export const filesApiEndPoint = "files";

export const getFiles = (query: any) =>
  axioInstance
    .get(`${filesApiEndPoint}${query && `?${query}`}`)
    .then((res) => res.data);

export const getDFiles = (id: number) =>
  axioInstance.get(`${filesApiEndPoint}/d/${id}`).then((res) => res.data);

export const updateFiles = (id: string, data: any) =>
  axioInstance
    .put(`${filesApiEndPoint}/update/${id}`, data)
    .then((res) => res.data);

export const deleteFiles = (id: string) =>
  axioInstance
    .delete(`${filesApiEndPoint}/delete/${id}`)
    .then((res) => res.data);

export const deleteFilesPermanent = (id: string) =>
  axioInstance
    .delete(`${filesApiEndPoint}/delete/permanent/${id}`)
    .then((res) => res.data);

export const restoreFiles = (id: string) =>
  axioInstance
    .post(`${filesApiEndPoint}/restore/${id}`)
    .then((res) => res.data);

