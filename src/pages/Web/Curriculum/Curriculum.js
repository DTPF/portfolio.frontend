import React, { useEffect, Suspense, lazy } from "react";
import { Row, Col, Button, BackTop } from "antd";
import { useHistory } from "react-router-dom";
import "./Curriculum.scss";
const WorkExperience = lazy(() => import("../../../components/Web/Curriculum/WorkExperience"));
const Education = lazy(() => import("../../../components/Web/Curriculum/Education"));
const ComplementaryEducation = lazy(() => import("../../../components/Web/Curriculum/ComplementaryEducation"));
const ComputerSkills = lazy(() =>  import("../../../components/Web/Curriculum/ComputerSkills"));
const Languages = lazy(() => import("../../../components/Web/Curriculum/Languages"));
const Projects = lazy(() =>  import("../../../components/Web/Curriculum/Projects"));

export default function Curriculum() {
  const goBack = useHistory().goBack;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Suspense fallback={<></>}>
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
          <div className="curriculum__button">
            <Button type="primary" onClick={goBack}>
              Volver
            </Button>
          </div>
        </div>
      </Suspense>
    </>
  );
}
