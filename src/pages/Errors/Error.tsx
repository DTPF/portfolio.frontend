import React, { Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";
const HelmetAnalytics = lazy(() => import("../../components/HelmetAnalytics"));
const Error404 = lazy(() => import("../../components/Error/Error404"));
const Error500 = lazy(() => import("../../components/Error/Error500"));

export default function Error(props: {
  title: any;
  subtitle: string;
  status: number;
}) {
  const { title, subtitle, status = 404 } = props;
  const goBack = useHistory().goBack;
  const history = useHistory();
  return (
    <>
    <Suspense fallback={<></>}>
      <HelmetAnalytics
        titleHelmet={`DTPF | Error ${status}`}
        contentHelmet={title ? title : "Recurso no encontrado."}
      />
      {(!status || status === 404) && (
        <Error404 title={title} subtitle={subtitle} goBack={goBack} history={history} />
      )}
      {status === 500 && (
        <Error500 title={title} subtitle={subtitle} />
      )}
    </Suspense>
    </>
  );
}