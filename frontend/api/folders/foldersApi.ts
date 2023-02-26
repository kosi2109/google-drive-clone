import axioInstance from "../axioInstance";

export const foldersApiEndPoint = "folders";

export const createFolder = (data : any) =>   
  axioInstance.post(`${foldersApiEndPoint}/create`, data).then((res) => res.data);

export const getFolders = (query : any) =>
  axioInstance.get(`${foldersApiEndPoint}${query && `?${query}`}`).then((res) => res.data);
  
export const getFolderById = (id : any) =>
  axioInstance.get(`${foldersApiEndPoint}/${id}`).then((res) => res.data);
  
export const updateFolders = (id : string, data : any) =>
  axioInstance.put(`${foldersApiEndPoint}/update/${id}`, data).then((res) => res.data);

export const deleteFolders = (id : string) =>
  axioInstance.delete(`${foldersApiEndPoint}/delete/${id}`).then((res) => res.data);

export const deleteFoldersPermanent = (id : string) =>
  axioInstance.delete(`${foldersApiEndPoint}/delete/permanent/${id}`).then((res) => res.data);

export const restoreFolders = (id : string) => 
  axioInstance.delete(`${foldersApiEndPoint}/restore/${id}`).then((res) => res.data);
