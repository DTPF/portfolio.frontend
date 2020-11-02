import { basePath, apiVersion } from "./config";

export async function connectionApi() {
  const url = `${basePath}/${apiVersion}/connection`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function reloadMessagesTrueApi(data) {
  const url = `${basePath}/${apiVersion}/reload-messages-true`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function reloadMessagesFalseApi() {
  const url = `${basePath}/${apiVersion}/reload-messages-false`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function messagesStatusApi() {
  const url = `${basePath}/${apiVersion}/messages-status`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}
