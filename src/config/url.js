import { isLocalhost } from "../utils/isLocalhost";
export const URL = isLocalhost ? "http://localhost:3000/" : "https://beta.dtpf.es/";
export const ENDPOINT = isLocalhost ? "http://localhost:3998" : "https://beta.dtpf.es";
