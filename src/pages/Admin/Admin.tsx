import React, { useEffect, useState, Suspense, lazy } from "react";
import { checkUserLogin } from "../../providers/AuthProvider";
const HelmetAnalytics = lazy(() => import("../../components/HelmetAnalytics"));
const Home = lazy(() => import("../../components/Admin/Home"));

export default function Admin() {  
  const [user, setUser] = useState(null);  
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      checkUserLogin(setUser);
    }
    return () => { unmounted = true }
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
