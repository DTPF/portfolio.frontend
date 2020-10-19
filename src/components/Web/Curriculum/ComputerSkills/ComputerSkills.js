import React from "react";
import { useNearScreen } from "../../../../hooks/useNearScreen";
import { Progress, Row, Col } from "antd";
import "./ComputerSkills.scss";

export default function ComputerSkills() {
  const [show, el] = useNearScreen();
  return (
    <div className="computer-skills">
      <div className="use-near-screen" ref={el}>
        {show && (
          <>
            <h2>Competencias Informáticas</h2>
            <Row>
              <Col span={24} sm={12} className="computer-skills__col">
                <PrAnt skill="HTML5" percent={70} steps={6} />
                <PrAnt skill="CSS3" percent={70} steps={6} />
                <PrAnt skill="SASS" percent={70} steps={6} />
                <PrAnt skill="Bootstrap" percent={80} steps={6} />
                <PrAnt skill="Ant-Design" percent={80} steps={6} />
                <PrAnt skill="Javascript" percent={60} steps={6} />
                <PrAnt skill="TypeScript" percent={40} steps={6} />
                <PrAnt skill="NodeJS" percent={40} steps={6} />
                <PrAnt skill="ExpressJS" percent={60} steps={6} />
                <PrAnt skill="React" percent={70} steps={6} />
                <PrAnt skill="Angular" percent={40} steps={6} />
                <PrAnt skill="Vue" percent={40} steps={6} />
                <PrAnt skill="JQuery" percent={20} steps={6} />
                <PrAnt skill="Ajax" percent={60} steps={6} />
              </Col>
              <Col span={24} sm={12} className="computer-skills__col">
                <PrAnt skill="Axios" percent={40} steps={6} />
                <PrAnt skill="Xampp, Wamp" percent={60} steps={6} />
                <PrAnt skill="Vagrant" percent={60} steps={6} />
                <PrAnt skill="PHP" percent={40} steps={6} />
                <PrAnt skill="Laravel" percent={60} steps={6} />
                <PrAnt skill="Symfony" percent={20} steps={6} />
                <PrAnt skill="Nginx" percent={60} steps={6} />
                <PrAnt skill="MongoDB" percent={40} steps={6} />
                <PrAnt skill="MySQL" percent={40} steps={6} />
                <PrAnt skill="MariaDB" percent={40} steps={6} />
                <PrAnt skill="Git" percent={60} steps={6} />
                <PrAnt skill="Linux" percent={70} steps={6} />
                <PrAnt skill="Windows" percent={60} steps={6} />
                <PrAnt skill="Wordpress" percent={60} steps={6} />
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

function PrAnt({ percent, steps, skill }) {
  return (
    <div className="computer-skills__skill">
      {skill}
      <span>
        <Progress percent={percent} steps={steps} showInfo={false} />
      </span>
    </div>
  );
}
