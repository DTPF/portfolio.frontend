import React, { useEffect, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../components/HelmetAnalytics"));
const ButtonGoBack = lazy(() => import("../../components/UI/ButtonGoBack"));
const PrivacyPolicyComponent = lazy(() => import("../../components/PrivacyPolicy"));

export default function PrivacyPolicy() {
  const goBack = useHistory().goBack;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      window.scrollTo(0, 0);
    }
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet="DTPF | Política de privacidad"
        contentHelmet="Página de política de privacidad de David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={goBack} eventGoBack="politica-privacidad" />
      <PrivacyPolicyComponent />
    </Suspense>
  );
}
