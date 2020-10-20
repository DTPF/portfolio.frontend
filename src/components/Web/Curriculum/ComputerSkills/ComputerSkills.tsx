import React from "react";
import { useNearScreen } from "../../../../hooks/useNearScreen";
import { Progress, Row, Col } from "antd";
import "./ComputerSkills.scss";

export default function ComputerSkills() {
  const [show, el] = useNearScreen();
  return (
    <div className="computer-skills">
      <Skills show={show} el={el} />
    </div>
  );
}

function Skills(props: { show: any; el: any }) {
  const { show, el } = props;
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <>
          <h2>Competencias Informáticas</h2>
          <Row>
            <Col span={24} sm={12} className="computer-skills__col">
              <Skill skill="HTML5" percent={70} steps={6} />
              <Skill skill="CSS3" percent={70} steps={6} />
              <Skill skill="SASS" percent={70} steps={6} />
              <Skill skill="Bootstrap" percent={80} steps={6} />
              <Skill skill="Ant-Design" percent={80} steps={6} />
              <Skill skill="Javascript" percent={60} steps={6} />
              <Skill skill="TypeScript" percent={40} steps={6} />
              <Skill skill="NodeJS" percent={40} steps={6} />
              <Skill skill="ExpressJS" percent={60} steps={6} />
              <Skill skill="React" percent={70} steps={6} />
              <Skill skill="Angular" percent={40} steps={6} />
              <Skill skill="Vue" percent={40} steps={6} />
              <Skill skill="JQuery" percent={20} steps={6} />
              <Skill skill="Ajax" percent={60} steps={6} />
            </Col>
            <Col span={24} sm={12} className="computer-skills__col">
              <Skill skill="Axios" percent={40} steps={6} />
              <Skill skill="Xampp, Wamp" percent={60} steps={6} />
              <Skill skill="Vagrant" percent={60} steps={6} />
              <Skill skill="PHP" percent={40} steps={6} />
              <Skill skill="Laravel" percent={60} steps={6} />
              <Skill skill="Symfony" percent={20} steps={6} />
              <Skill skill="Nginx" percent={60} steps={6} />
              <Skill skill="MongoDB" percent={40} steps={6} />
              <Skill skill="MySQL" percent={40} steps={6} />
              <Skill skill="MariaDB" percent={40} steps={6} />
              <Skill skill="Git" percent={60} steps={6} />
              <Skill skill="Linux" percent={70} steps={6} />
              <Skill skill="Windows" percent={60} steps={6} />
              <Skill skill="Wordpress" percent={60} steps={6} />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

function Skill(props: { percent: any; steps: any; skill: any }) {
  const { percent, steps, skill } = props;
  return (
    <div className="computer-skills__skill">
      {skill}
      <span>
        <Progress percent={percent} steps={steps} showInfo={false} />
      </span>
    </div>
  );
}
