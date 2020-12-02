import { basePath, apiVersion } from "./config";
import { makeRequest } from "../api/utils/makeRequest";

export function connectionApi() {
  const url = `${basePath}/${apiVersion}/connection`;
  return makeRequest(url);
}

export function reloadMessagesTrueApi() {
  const url = `${basePath}/${apiVersion}/reload-messages-true`;
  return makeRequest(url, true, true, "POST");
}

export function reloadMessagesFalseApi() {
  const url = `${basePath}/${apiVersion}/reload-messages-false`;
  return makeRequest(url, true, true, "POST");
}

export function messagesStatusApi() {
  const url = `${basePath}/${apiVersion}/messages-status`;
  return makeRequest(url);
}
