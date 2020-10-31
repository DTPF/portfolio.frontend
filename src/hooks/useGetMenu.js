import { useState, useEffect } from "react";
import { getMenuApi } from "../api/menu";

export default function useGetMenu(ignoreMenu) {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    let unmounted = false;
    getMenuApi().then((response) => {
      if (response.status !== 200) {
        console.log("Error del servidor.");
      } else {
        const arrayMenu = [];
        if (!unmounted) {
          response.menu &&
            response.menu.forEach((item) => {
              item.active && arrayMenu.push(item);
            });
          setMenuData(arrayMenu.filter((item) => item.url !== ignoreMenu));
        }
      }
      return () => { unmounted = true };
    });
  }, [ignoreMenu]);
  return menuData;
}
