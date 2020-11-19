import { useState, useEffect } from "react";
import { connectionApi } from "../api/utils";

export default function useConnection() {
  const [connection, setConnection] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [timeToReload, setTimeToReload] = useState(1000);
  useEffect(() => {
    let unmounted = false;
    const onLine = window.navigator.onLine;
    if (onLine) {
      if (!unmounted) {
        setIsOnline(onLine);
      }
      connectionApi().then((response) => {
        if (response.status) {
          if (!unmounted) {
            setConnection(response.status);
          }
        } else {
          if (!unmounted) {
            setConnection(500);
          }
        }
      });
    } else {
      if (!unmounted) {
        setConnection(200);
        setIsOnline(onLine);
      }
    }
    return () => { unmounted = true };
  }, []);
  useEffect(() => {
    let unmounted = false;
    const interval = setInterval(() => {
      const onLine = window.navigator.onLine;
      if (onLine) {
        if (!unmounted) {
          setIsOnline(onLine);
        }
        connectionApi().then((response) => {
          if (response.status) {
            if (!unmounted) {
              setConnection(response.status);
              setTimeToReload(30000);
            }
          } else {
            if (!unmounted) {
              setConnection(500);
              setTimeToReload(1000);
            }
          }
        });
      } else {
        if (!unmounted) {
          setConnection(200);
          setIsOnline(onLine);
          setTimeToReload(1000);
        }
      }
    }, timeToReload);
    return () => {
      clearInterval(interval);
      unmounted = true;
    };
  }, [timeToReload, isOnline]);
  return { connection, isOnline };
}
