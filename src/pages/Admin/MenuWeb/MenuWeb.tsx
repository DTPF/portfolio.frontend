import React, { useState, useEffect, Suspense, lazy } from "react";
import { getMenuApi } from "../../../api/menu";
const MenuWebList = lazy(() => import('../../../components/Admin/MenuWeb/MenuWebList'));
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));

export default function MenuWeb() {
  const [menu, setMenu] = useState(null);
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
        <HelmetAnalytics
          titleHelmet="DTPF | Admin Menú Web"
          contentHelmet="Página Admin de Menú Web"
        />
        <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
      </Suspense>
    </div>
  );
}
