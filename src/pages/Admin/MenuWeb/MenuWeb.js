import React, { useState, useEffect } from "react";
import { getMenuApi } from "../../../api/menu";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";
import { Spin } from "antd";

export default function MenuWeb() {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  let menuLength = menu.length ? menu.length : 0;

  useEffect(() => {
    let unmounted = false;
    getMenuApi()
      .then(response => {
        if (!unmounted) {
          setMenu(response.menu);
        }
      });
      setReloadMenuWeb(false);      
      return () => { unmounted = true };
  }, [reloadMenuWeb]);

  return (
    <div className="menu-web">
      {menuLength === 0 ? (
        <Spin
          tipe="Cargando menú"
          style={{ 
            textAlign: "center",
            width: "100%",
            padding: "20px",
            marginTop: "200px"
          }}
        />
      ) : (
        <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
      )}
    </div>
  );
}
