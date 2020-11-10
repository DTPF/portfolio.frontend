import { useState, useEffect } from "react";
import { connectionApi } from "../api/utils";
import { message } from "antd";

export default function useConnection() {
  const [connection, setConnection] = useState(null);
  const [checkConnection, setCheckConnection] = useState(null);
  const [timeToReload, setTimeToReload] = useState(0);
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
            5
          );
        }
      }
    });
    return () => { unmounted = true };
  }, []);
  useEffect(() => {
    let unmounted = false;
    const interval = setInterval(() => {
      connectionApi().then((response) => {
        if (response.status) {
          if (!unmounted) {
            setCheckConnection(response.status);
            setConnection(response.status);
            setTimeToReload(30000);
          }
        } else {
          if (!unmounted) {
            setCheckConnection(500);
            setTimeToReload(1000);
          }
        }
      });
    }, timeToReload);
    return () => { clearInterval(interval); unmounted = true };
  }, [timeToReload]);  
  return { connection, checkConnection };
}
