import { apiVersion, basePath } from "./config";

export async function subscribeContactApi(data) {
  const url = `${basePath}/${apiVersion}/contact-me/`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getMessagesApi() {
  const url = `${basePath}/${apiVersion}/get-contact-messages`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getMessagesUnreadApi(token, status) {
  const url = `${basePath}/${apiVersion}/get-contact-messages-unread?readed=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function checkMessageApi(token, messageId, status) {
  const url = `${basePath}/${apiVersion}/check-contact-message/${messageId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ readed: status })
  }
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function deleteContactMessageApi(token, messageId) {
  const url = `${basePath}/${apiVersion}/delete-contact-message/${messageId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}