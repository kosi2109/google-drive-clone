import axioInstance from "../axioInstance";

export const foldersApiEndPoint = "folders";

export const createFolder = (name: any) =>
  axioInstance.post(`${foldersApiEndPoint}/create`, { name }).then((res) => res.data);

export const getFolders = (query : any) =>
  axioInstance.get(`${foldersApiEndPoint}${query && `?${query}`}`).then((res) => res.data);
  
export const updateFolders = (id : number, data : any) =>
  axioInstance.put(`${foldersApiEndPoint}/update/${id}`, data).then((res) => res.data);

export const deleteFolders = (id : number) =>
  axioInstance.delete(`${foldersApiEndPoint}/delete/${id}`).then((res) => res.data);

export const deleteFoldersPermanent = (id : number) =>
  axioInstance.delete(`${foldersApiEndPoint}/delete/permanent/${id}`).then((res) => res.data);

export const restoreFolders = (id : number) =>
  axioInstance.delete(`${foldersApiEndPoint}/restore/${id}`).then((res) => res.data);
