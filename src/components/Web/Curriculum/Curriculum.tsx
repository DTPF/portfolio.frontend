import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Spin from "../../../components/UI/Spin";
import WorkExperience from "../../../components/Web/Curriculum/WorkExperience";
import Education from "../../../components/Web/Curriculum/Education";
import ComplementaryEducation from "../../../components/Web/Curriculum/ComplementaryEducation";
import ComputerSkills from "../../../components/Web/Curriculum/ComputerSkills";
import Languages from "../../../components/Web/Curriculum/Languages";
import Projects from "../../../components/Web/Curriculum/Projects";
import "./Curriculum.scss";

export default function Curriculum() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsLoading(true);
    }
    window.scrollTo(0, 0);
    return () => { unmounted = true };
  }, []);
  return (
    <>
      {!isLoading ? (
        <Spin />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}
