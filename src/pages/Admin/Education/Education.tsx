import React, { Suspense, lazy } from "react";
const EducationComponent = lazy(() => import("../../../components/Admin/Education"));
const Helmet = lazy(() => import("../../../components/Helmet"));

export default function Education() {
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Cursos"
        contentHelmet="Página Admin de Cursos"
      />
      <EducationComponent />
    </Suspense>
  );
}
