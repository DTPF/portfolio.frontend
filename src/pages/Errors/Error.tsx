import React, { Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../components/HelmetAnalytics"));
const Error404 = lazy(() => import("../../components/Error/Error404"));

export default function Error(props: {
  title: any;
  subtitle: string;
}) {
  const { title, subtitle } = props;
  const goBack = useHistory().goBack;
  return (
    <>
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet={`DTPF | Error ${title ? title : 404}`}
        contentHelmet="Error al buscar la página"
      />
      <Error404 title={title} subtitle={subtitle} goBack={goBack} />
    </Suspense>
    </>
  );
}
