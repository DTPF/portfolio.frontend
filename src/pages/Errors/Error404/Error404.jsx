import React, { Suspense, lazy } from "react";
import "./Error404.scss";
const ResultAntErr = lazy(() => import("../Errors"));

export default function Error404() {
  return (
    <Suspense fallback={<></>}>
      <ResultAntErr />
    </Suspense>
  );
}
