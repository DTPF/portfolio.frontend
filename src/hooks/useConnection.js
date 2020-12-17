import { useState, useEffect } from "react";
import { connectionApi } from "../api/utils";

export function useDBConnectionStatus() {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [timeToReload, setTimeToReload] = useState(2000);
  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      const onLine = window.navigator.onLine;
      connectionApi().then((response) => {
        if (isMounted) {
          if (!onLine) {
            setConnectionStatus(200);
          } else {
            setConnectionStatus(response.status ? response.status : 500);
            setTimeToReload(response.status ? 3000 : 2000);
          }
        }
      });
    }, timeToReload);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [timeToReload]);
  return connectionStatus;
}

export function useIsNavigatorOnline() {
  const [isNavigatorOnline, setIsNavigatorOnline] = useState(true);
  const [timeToReload, setTimeToReload] = useState(2000);
  useEffect(() => {
    const interval = setInterval(() => {
      const onLine = window.navigator.onLine;
      if (onLine) {
        setIsNavigatorOnline(true);
        setTimeToReload(3000);
      } else {
        setIsNavigatorOnline(false);
        setTimeToReload(2000);
      }
    }, timeToReload);
    return () => { clearInterval(interval) };
  }, [timeToReload]);
  return isNavigatorOnline;
}
