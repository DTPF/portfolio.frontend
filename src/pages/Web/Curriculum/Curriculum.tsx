import React, { useState, useEffect, Suspense, lazy } from "react";
import { BackTop } from "antd";
import { useHistory } from "react-router-dom";
import "./Curriculum.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const Spin = lazy(() => import("../../../components/UI/Spin"));
const CurriculumWeb = lazy(() => import("../../../components/Web/Curriculum"));
const ButtonGoBack = lazy(() => import("../../../components/UI/ButtonGoBack"));

export default function Curriculum(props: any) {
  const { location } = props;
  const [isLoading, setIsLoading] = useState(false);
  const goBack = useHistory().goBack;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsLoading(true);
      window.scrollTo(0, 0);
    }
    return () => { unmounted = true };
  }, []);  
  return (
    <>
        {!isLoading ? (
          <Suspense fallback={<></>}>
            <Spin />
          </Suspense>
        ) : (
          <Suspense fallback={<></>}>
            <BackTop />
            <HelmetAnalytics
              titleHelmet="DTPF | Curriculum"
              contentHelmet="Curriculum de David Thomas Pizarro Frick"
            />
            <ButtonGoBack goBack={goBack} eventGoBack="curriculum" />
            <CurriculumWeb location={location} />
          </Suspense>
        )}
    </>
  );
}
