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