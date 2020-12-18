import { isLocalhost } from "../utils/isLocalhost";
export const URL = isLocalhost ? "http://localhost:3000/" : "https://dtpf.es/";
export const ENDPOINT = isLocalhost ? "http://localhost:3998" : "https://dtpf.es";
// export const URL = "https://beta.dtpf.es/";
// export const ENDPOINT = "https://beta.dtpf.es";
