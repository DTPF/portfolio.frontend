import { DB_DTPF_LS_NAME } from "../config";
import { StorageValid } from "../../utils/validations";
import { getIndexedDBVersionApi } from "../../api/utils";
import { message } from "antd";

export default function setIndexedDBVersion(db: any) {
  setIdbVersion();
  setInterval(() => {
    setIdbVersion();
  }, 60000);
  function setIdbVersion() {
    getIndexedDBVersionApi()
      .then((res) => {
        res.indexedDBVersion && StorageValid() &&
          localStorage.setItem(DB_DTPF_LS_NAME, res.indexedDBVersion);
        const reload = () => window.location.reload();
        if (res.indexedDBVersion === db.version + 1) {
          message.info("Contenido nuevo. Actualizando la web", reload);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  }
}
