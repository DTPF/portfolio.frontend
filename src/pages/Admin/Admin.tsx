import React, { useEffect, useState, Suspense, lazy } from "react";
import { checkUserLogin } from "../../providers/AuthProvider";
const HelmetAnalytics = lazy(() => import("../../components/HelmetAnalytics"));
const Home = lazy(() => import("../../components/Admin/Home"));

export default function Admin(props: any) {  
  const [user, setUser] = useState(null);  
  useEffect(() => {
    checkUserLogin(setUser);
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Admin"
        contentHelmet="Página principal de Admin"
      />
      <Home userData={user} />
    </Suspense>
  );
}

