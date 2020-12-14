import React, { Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../components/Helmet"));
const Home = lazy(() => import("../../components/Admin/Home"));

export default function Admin() {  
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin"
        contentHelmet="Página principal de Admin"
      />
      <Home />
    </Suspense>
  );
}
