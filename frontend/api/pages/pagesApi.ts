import axioInstance from "../axioInstance";

export const filesApiEndPoint = "pages";

export const getPageData = (page: string) =>
  axioInstance.get(`${filesApiEndPoint}/${page}`).then((res) => res.data);