import { useState, useEffect } from "react";
import { connectionApi } from "../api/system";
import { message } from "antd";

export default function useConnection() {
  const [connection, setConnection] = useState(null);
  const [checkConnection, setCheckConnection] = useState(null);
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
            10
          );
        }
      }
    });
    return () => { unmounted = true };
  }, []);

  useEffect(() => {
    let unmounted = false;
    setInterval(() => {
      connectionApi().then((response) => {
        if (response.status) {
          if (!unmounted) {
            setCheckConnection(response.status);
            setConnection(response.status);
          }
        } else {
          if (!unmounted) {
            setCheckConnection(500);
          }
        }
      });
    }, 3000);
    return () => { unmounted = true };
  }, []);

  return { connection, checkConnection };
}
