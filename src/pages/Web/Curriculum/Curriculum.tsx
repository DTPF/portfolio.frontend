import React, { useState, useEffect, Suspense, lazy } from "react";
import { Row, Col, BackTop } from "antd";
import "./Curriculum.scss";
const WorkExperience = lazy(() => import("../../../components/Web/Curriculum/WorkExperience"));
const Education = lazy(() => import("../../../components/Web/Curriculum/Education"));
const ComplementaryEducation = lazy(() => import("../../../components/Web/Curriculum/ComplementaryEducation"));
const ComputerSkills = lazy(() => import("../../../components/Web/Curriculum/ComputerSkills"));
const Languages = lazy(() => import("../../../components/Web/Curriculum/Languages"));
const Projects = lazy(() => import("../../../components/Web/Curriculum/Projects"));
const CategoriesBigButtons = lazy(() => import("../../../components/Web/CategoriesBigButtons/CategoriesBigButtons"));
const HelmetAnalytics = lazy(() => import("../../../components/HelmetAnalytics"));
const Spin = lazy(() => import("../../../components/Spin"));

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
  console.log(isLoading);
  
  return (
    <>
      <Suspense fallback={<></>}>
        {!isLoading ? (
          <Spin />
        ) : (
          <>
            <HelmetAnalytics
              titleHelmet="DTPF | Curriculum"
              contentHelmet="Curriculum de David Thomas Pizarro Frick"
            />
            <BackTop />
            <div className="curriculum">
              <Row>
                <Col span={24}>
                  <h1 className="curriculum__title">CURRICULUM VITAE</h1>
                </Col>
                <Col span={24} xl={12}><WorkExperience /></Col>
                <Col span={24} xl={12}>
                  <Row>
                    <Col span={24} lg={12} xl={24}><Education /></Col>
                    <Col span={24} lg={12} xl={24}><ComplementaryEducation /></Col>
                  </Row>
                  <Col span={24}><ComputerSkills /></Col>
                  <Row className="curriculum__languages-projects">
                    <Col span={24} md={10}><Languages /></Col>
                    <Col span={24} md={14}><Projects /></Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <CategoriesBigButtons
              location={location.pathname}
              extra="categories-big-buttons__extra"
            />
          </>
        )}
      </Suspense>
    </>
  );
}
