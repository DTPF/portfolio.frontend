import React, { Suspense, lazy } from "react";
const Helmet = lazy(() => import("../../components/Helmet"));
const ButtonGoBack = lazy(() => import("../../components/UI/ButtonGoBack"));
const PrivacyPolicyComponent = lazy(() => import("../../components/PrivacyPolicy"));

export default function PrivacyPolicy(props: any) {
  const { history } = props;
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Política de privacidad"
        contentHelmet="Página de política de privacidad de David Thomas Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="politica-privacidad" />
      <PrivacyPolicyComponent />
    </Suspense>
  );
}
