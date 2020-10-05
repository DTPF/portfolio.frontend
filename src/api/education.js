import { basePath, apiVersion } from "./config";

export function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(course)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export async function updateCourseApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getCoursesApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-courses?limit=${limit}&page=${page}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getCourseApi(urlCourse) {
  const url = `${basePath}/${apiVersion}/get-course/${urlCourse}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/get-image/${imageName}`;

  return fetch(url)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
}

export function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export async function addTagApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/add-tag/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function deleteTagApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/delete-tag/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}