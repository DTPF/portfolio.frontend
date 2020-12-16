import { useState, useEffect } from "react";
import { getMenuApi } from "../api/menu";
import { useDBConnectionStatus, useNavigatorIsOnline } from "../hooks/useConnection";

export default function useGetMenu(ignoreMenu) {
  const [menuData, setMenuData] = useState([]);
  const isNavigatorOnline = useNavigatorIsOnline();
  const connectionStatus = useDBConnectionStatus();
  useEffect(() => {
    let isMounted = true;
    getMenuApi().then((response) => {
      if (response.status === 200) {
        const arrayMenu = [];
        response.menu &&
          response.menu.forEach((item) => {
            item.active && arrayMenu.push(item);
          });
        isMounted &&
          setMenuData(arrayMenu.filter((item) => item.url !== ignoreMenu));
      } else {
        console.log("Error del servidor.");
      }
      return () => { isMounted = false };
    });
  }, [connectionStatus, isNavigatorOnline]);
  return menuData;
}
