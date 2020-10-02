import { basePath, apiVersion } from "./config";

export function getCoursesApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-courses?limit=${limit}&page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/get-image/${imageName}`;

  return fetch(url)
    .then(response => {
      return response;
    })
    .then(err => {
      return err;
    })
}
