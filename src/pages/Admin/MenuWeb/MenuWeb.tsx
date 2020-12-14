import React, { useState, Suspense, lazy } from "react";
const MenuWebList = lazy(() => import("../../../components/Admin/MenuWeb/MenuWebList"));
const Helmet = lazy(() => import("../../../components/Helmet"));

export default function MenuWeb() {
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Menú Web"
        contentHelmet="Página Admin de Menú Web"
      />
      <MenuWebList reloadMenuWeb={reloadMenuWeb} setReloadMenuWeb={setReloadMenuWeb} />
    </Suspense>
  );
}
