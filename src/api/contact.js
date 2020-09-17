import { apiVersion, basePath } from "./config";

export function subscribeContactApi(data) {
  const url = `${basePath}/${apiVersion}/contact-me/`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
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
