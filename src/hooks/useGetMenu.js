import { useState, useEffect } from "react";
import { getMenuApi } from "../api/menu";
import { notification } from "antd";

export default function useGetMenu(ignoreMenu) {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    let unmounted = false;
    getMenuApi().then((response) => {
      if (response.status !== 200) {
        notification["error"]({
          message:
            "Ha ocurrido un error en el servidor, vuelve más tarde y disculpa las molestias.",
          duration: 15,
        });
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
