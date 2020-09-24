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
    .then((err) => {
      return err;
    });
}

export function getMessagesApi() {
  const url = `${basePath}/${apiVersion}/get-contact-messages`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .then((err) => {
      return err;
    });
}

export function getMessagesUnreadApi(token, status) {
  const url = `${basePath}/${apiVersion}/get-contact-messages-unread?readed=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }

  return fetch(url, params)
    .then((response => {
      return response.json();
    }))
    .then((result => {
      return result;
    }))
    .then((err) => {
      return err;
    });
}

export function checkMessageApi(token, messageId, status) {
  const url = `${basePath}/${apiVersion}/check-contact-message/${messageId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ readed: status })
  }

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .then(err => {
      return err;
    });
}

export function deleteContactMessageApi(token, messageId) {
  const url = `${basePath}/${apiVersion}/delete-contact-message/${messageId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .then(err => {
      return err;
    })
}