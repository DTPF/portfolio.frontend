import React, { useState, Suspense, lazy } from "react";
const ListUsers = lazy(() => import("../../../components/Admin/Users/ListUsers"));
const Helmet = lazy(() => import("../../../components/Helmet"));

export default function Users() {
  const [reloadUsers, setReloadUsers] = useState(false);
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Usuarios"
        contentHelmet="Página Admin de Usuarios"
      />
      <ListUsers
        reloadUsers={reloadUsers}
        setReloadUsers={setReloadUsers}
      />
    </Suspense>
  );
}
