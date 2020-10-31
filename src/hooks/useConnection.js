import { useState, useEffect } from "react";
import { connectionApi } from "../api/system";
import { message } from "antd";

export default function useConnection() {
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    let unmounted = false;
    connectionApi().then((response) => {
      if (response.status) {
        if (!unmounted) {
          setConnection(response.status);
        }
      } else {
        if (!unmounted) {
          setConnection(500);
          message.error(
            "Ha ocurrido un error en el servidor, vuelve más tarde y disculpa las molestias.",
            20
          );
        }
      }
    });
    return () => { unmounted = true };
  }, []);
  return connection;
}
