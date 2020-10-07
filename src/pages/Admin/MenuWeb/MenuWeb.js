import React, { useState, useEffect, Suspense, lazy } from "react";
import { getMenuApi } from "../../../api/menu";
const MenuWebList = lazy(() => import('../../../components/Admin/MenuWeb/MenuWebList'));

export default function MenuWeb() {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
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
      <Suspense fallback={<></>}>
        <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
      </Suspense>
    </div>
  );
}
