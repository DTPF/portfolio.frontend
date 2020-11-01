import React, { useState, useEffect, Suspense, lazy } from "react";
import { BackTop } from "antd";
import "./Curriculum.scss";
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const Spin = lazy(() => import("../../../components/UI/Spin"));
const CurriculumWeb = lazy(() => import("../../../components/Web/Curriculum"));

export default function Curriculum(props: any) {
  const { location } = props;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsLoading(true);
    }
    window.scrollTo(0, 0);
  }, []);  
  return (
    <>
      <Suspense fallback={<></>}>
        {!isLoading ? (
          <Spin />
        ) : (
          <>
            <BackTop />
            <HelmetAnalytics
              titleHelmet="DTPF | Curriculum"
              contentHelmet="Curriculum de David Thomas Pizarro Frick"
            />
            <CurriculumWeb location={location} />
          </>
        )}
      </Suspense>
    </>
  );
}
