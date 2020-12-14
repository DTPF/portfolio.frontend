import React, { Suspense, lazy } from "react";
const SignInComponent = lazy(() => import("../../../components/Admin/SignIn"));
const Helmet = lazy(() => import("../../../components/Helmet"));

export default function SignIn() {
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Login"
        contentHelmet="Página de Admin Login"
      />
      <SignInComponent />
    </Suspense>
  );
}
