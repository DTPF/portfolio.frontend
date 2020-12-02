import { basePath, apiVersion } from "./config";
import { makeRequest } from "../api/utils/makeRequest";

export function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;
  return makeRequest(url, true, true, "POST", token, JSON.stringify(course));
}

export function updateCourseApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;
  return makeRequest(url, true, true, "PUT", token, JSON.stringify(data));
}

export function getCoursesApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-courses?limit=${limit}&page=${page}`;
  return makeRequest(url);
}

export function getCourseApi(urlCourse) {
  const url = `${basePath}/${apiVersion}/get-course/${urlCourse}`;
  return makeRequest(url);
}

export function getCourseByOrderApi(order) {
  const url = `${basePath}/${apiVersion}/get-course-order/${order}`;
  return makeRequest(url);
}

export function uploadImageApi(token, image, courseId) {
  const url = `${basePath}/${apiVersion}/upload-image/${courseId}`;
  const formData = new FormData();
  formData.append("image", image);
  return makeRequest(url, true, true, "PUT", token, formData, null);
}

export function getImageApi(imageName) {
  const url = `${basePath}/${apiVersion}/get-image/${imageName}`;
  return makeRequest(url, null, false);
}

export function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;
  return makeRequest(url, true, true, "DELETE", token);
}

export function addTagApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/add-tag/${id}`;
  return makeRequest(url, true, true, "PUT", token, JSON.stringify(data));
}

export function deleteTagApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/delete-tag/${id}`;
  return makeRequest(url, true, true, "DELETE", token, JSON.stringify(data));
}
