import { basePath, apiVersion } from "./config";

export async function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(course)
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
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

export async function uploadImageApi(token, image, courseId) {
  const url = `${basePath}/${apiVersion}/upload-image/${courseId}`;
  const formData = new FormData();
  formData.append("image", image);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/get-image/${imageName}`;

  try {
    const response = await fetch(url);
    return response;
  } catch (err) {
    return err;
  }
}

export async function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
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