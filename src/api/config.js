import { isLocalhost } from "../utils/isLocalhost";
export const basePath = isLocalhost ? "http://localhost:3998/api" : "https://dtpf.es/api";
// export const basePath = "https://beta.dtpf.es/api";
export const apiVersion = "v1";
