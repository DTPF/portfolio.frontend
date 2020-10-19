import React from "react";
import { useNearScreen } from "../../../../hooks/useNearScreen";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./WorkExperience.scss";
const { Panel } = Collapse;

export default function WorkExperience() {
  return (
    <div className="work-experience">
      <h2 className="work-experience__title">Experiencia Laboral</h2>
      <div className="timeline">
        <ProximaExperiencia />
        <SupermercadoChipYChop />
        <TizonaSL />
        <MoyaSaus />
        <IntegraTap />
        <LlabresFeliu />
        <TallerLaCabina />
      </div>
    </div>
  );
}

function ProximaExperiencia() {
  const [show, el] = useNearScreen();
  const textA = `En búsqueda activa de empleo.`;
  const textB = `
    Desde septiembre de 2018 formándome en diferentes lenguajes 
    y tecnologías en un centro formativo (FP), complementado con 
    cursos online con y sin certificado, y de manera autodidacta para 
    ser desarrrollador de software.
  `;
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-7 right">
          <div className="title-right workx-7">
            <h2>PRÓXIMA EXPERIENCIA</h2>
          </div>
          <div className="content">
            <h3>Agosto 2020</h3>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="work-collapse"
            >
              <Panel
                header="Desarrollador Junior de Software"
                key="1"
                className="work-collapse-panel"
              >
                <p className="work-collapse-panel__text">
                  {textA}
                  <br />
                  {textB}
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
}

function SupermercadoChipYChop() {
  const [show, el] = useNearScreen();
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-6 left">
          <div className="title-left workx-6">
            <h2>SUPERMERCADO CHIP Y CHOP</h2>
          </div>
          <div className="content">
            <h3>Temporada 2018</h3>
            <p>Dependiente de supermercado</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TizonaSL() {
  const [show, el] = useNearScreen();
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-5 right">
          <div className="title-right workx-5">
            <h2>TIZONA S.L (GRUPO IFA)</h2>
          </div>
          <div className="content">
            <h3>2016</h3>
            <p>Encargado de supermercado</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MoyaSaus() {
  const [show, el] = useNearScreen();
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-4 left">
          <div className="title-left workx-4">
            <h2>MOYA SAUS (Grupo IFA)</h2>
          </div>
          <div className="content">
            <h3>2016 - Enero 2017</h3>
            <p>Encargado de supermercado</p>
            <h3>2011 - 2015</h3>
            <p>Segundo encargado de supermercado</p>
            <h3>2010</h3>
            <p>Dependiente de supermercado</p>
          </div>
        </div>
      )}
    </div>
  );
}

function IntegraTap() {
  const [show, el] = useNearScreen();
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-3 right">
          <div className="title-right workx-3">
            <h2>INTEGRA TAP</h2>
          </div>
          <div className="content">
            <h3>2008 - 2010</h3>
            <p>Oficial 2ª en aplicaciones técnicas de albañilería</p>
          </div>
        </div>
      )}
    </div>
  );
}

function LlabresFeliu() {
  const [show, el] = useNearScreen();
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-2 left">
          <div className="title-left workx-2">
            <h2>LLABRÉS FELIU MEDI-AMBENT</h2>
          </div>
          <div className="content">
            <h3>2006 - 2008</h3>
            <p>Peón, Oficial y Capataz de albañilería</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TallerLaCabina() {
  const [show, el] = useNearScreen();
  return (
    <div className="use-near-screen" ref={el}>
      {show && (
        <div className="container workx-1 right">
          <div className="title-right workx-1">
            <h2>TALLER LA CABINA</h2>
          </div>
          <div className="content">
            <h3>Mayo - Octubre 2006</h3>
            <p>Auxiliar de administrativo en taller de automóviles</p>
          </div>
        </div>
      )}
    </div>
  );
}
