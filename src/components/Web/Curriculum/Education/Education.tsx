import React, { useState } from "react";
import { useNearScreen } from "../../../../hooks/useNearScreen";
import { Row, Col, Collapse } from "antd";
import Modal from "../../../Modal";
import { LeftCircleTwoTone, FilePdfOutlined } from "@ant-design/icons";
import "./Education.scss";
const memoriaRecetasPDF = require("../../../../assets/pdf/memoria-proyecto-final.pdf");
const { Panel } = Collapse;

export default function Education() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  return (
    <>
      <Row className="education">
        <Col span={24} className="education__title">
          <h2>Formación oficial</h2>
        </Col>
        <DesarrolloAppFPN3 setIsVisibleModal={setIsVisibleModal} />
        <CompetenciasClaveN3 />
        <HerramientasWebN3 />
        <AdministrativoN1 />
        <GraduadoEscolar />
      </Row>
      <ModalPDF
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
    </>
  );
}

function ModalPDF(props: any) {
  const { isVisibleModal, setIsVisibleModal } = props;
  return (
    <Modal
      title="Memória de Blog de Recetas"
      isVisible={isVisibleModal}
      setIsVisible={setIsVisibleModal}
      className="education__modal-pdf-curriculum"
    >
      <object type="application/pdf" data={memoriaRecetasPDF}>
        <p>
          Error al mostrar el PDF,
          <a href="../../../assets/pdf/memoria-proyecto-final.pdf" download>
            &nbsp;descarga&nbsp;
          </a>
          el PDF para ver la memória de proyecto final de Recetas Deliciosas
          MSR's.
        </p>
      </object>
    </Modal>
  );
}

function DesarrolloAppFPN3(props: any) {
  const { setIsVisibleModal } = props;
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <Col span={24} className="education__collapse">
          <Collapse
            accordion
            expandIconPosition={"right"}
            expandIcon={({ isActive }) => (
              <LeftCircleTwoTone
                twoToneColor="#5d718d"
                style={{ fontSize: "26px" }}
                rotate={isActive ? -90 : 0}
              />
            )}
          >
            <Panel
              header="DESARROLLO DE APLICACIONES CON TECNOLOGÍAS WEB – NIVEL 3"
              key="1"
            >
              <h3>Marzo 2019 - Julio 2020</h3>
              <h4>Muévete Formación</h4>
              <p>Programación web en el entorno cliente</p>
              <ul>
                <li>
                  Elaboración de documentos web mediante lenguajes de marca.
                </li>
                <li>
                  Desarrollo y reutilización de componentes software y
                  multimedia mediante lenguajes de guión.
                </li>
                <li>
                  Aplicaciones técnicas de usabilidad y accesibilidad en el
                  entorno cliente.
                </li>
              </ul>
              <p>Programación web en el entorno servidor</p>
              <ul>
                <li>Desarrollo de aplicaciones web en el entorno servidor.</li>
                <li>
                  Acceso a datos en aplicaciones web del entorno servidor.
                </li>
                <li>Desarrollo de aplicaciones web distribuidas.</li>
              </ul>
              <p>Implantación de aplicaciones web en entorno internet</p>
              <p>
                Realización de proyecto final:{" "}
                <span
                  className="education__pdf"
                  onClick={() => setIsVisibleModal(true)}
                >
                  Memória de proyecto <FilePdfOutlined />
                </span>
              </p>
            </Panel>
          </Collapse>
        </Col>
      )}
    </div>
  );
}

function CompetenciasClaveN3() {
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <Col span={24} className="education__collapse">
          <Collapse
            accordion
            expandIconPosition={"right"}
            expandIcon={({ isActive }) => (
              <LeftCircleTwoTone
                twoToneColor="#5d718d"
                style={{ fontSize: "26px" }}
                rotate={isActive ? -90 : 0}
              />
            )}
          >
            <Panel header="PRUEBA DE COMPETENCIAS CLAVE - NIVEL 3" key="1">
              <h3>Marzo 2019</h3>
              <h4>CEPA La Balanguera</h4>
              <ul>
                <li>Castellano</li>
                <li>Catalán</li>
                <li>Matemáticas</li>
              </ul>
            </Panel>
          </Collapse>
        </Col>
      )}
    </div>
  );
}

function HerramientasWebN3() {
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <Col span={24} className="education__collapse">
          <Collapse
            accordion
            expandIconPosition={"right"}
            expandIcon={({ isActive }) => (
              <LeftCircleTwoTone
                twoToneColor="#5d718d"
                style={{ fontSize: "26px" }}
                rotate={isActive ? -90 : 0}
              />
            )}
          >
            <Panel header="HERRAMIENTAS WEB – NIVEL 2" key="1">
              <h3>Septiembre 2018 - Marzo 2019</h3>
              <h4>Muévete Formación</h4>
              <ul>
                <li>Diseño y Maquetación de páginas web con mockups.</li>
                <li>
                  Creación y puesta en producción de página web con Wordpress.
                </li>
                <li>Introducción a HTML5</li>
                <li>
                  Introducción a CSS3, aplicándolo a temas hijos creados en
                  Wordpress.
                </li>
                <li>Posicionamiento web: SEO y SEM.</li>
                <li>Plan de Marketing Digital de una empresa.</li>
                <li>Creación de presupuestos para páginas web.</li>
                <li>Contenido adicional: Prestashop, Bigcommerce, Shopify.</li>
              </ul>
            </Panel>
          </Collapse>
        </Col>
      )}
    </div>
  );
}

function AdministrativoN1() {
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <Col span={24} className="education__collapse">
          <Collapse
            accordion
            expandIconPosition={"right"}
            expandIcon={({ isActive }) => (
              <LeftCircleTwoTone
                twoToneColor="#5d718d"
                style={{ fontSize: "26px" }}
                rotate={isActive ? -90 : 0}
              />
            )}
          >
            <Panel
              header="PROGRAMA DE CUALIFICACIÓN PROFESIONAL INICIAL DE ADMINISTRATIVO"
              key="1"
            >
              <h3>2006</h3>
              <h4>IFOC</h4>
              <p>
                Formación profesional de Auxiliar de Administrativo de nivel
                básico
              </p>
            </Panel>
          </Collapse>
        </Col>
      )}
    </div>
  );
}

function GraduadoEscolar() {
  const [show, el] = useNearScreen();
  let ref: any = el;
  return (
    <div className="use-near-screen" ref={ref}>
      {show && (
        <Col span={24} className="education__collapse">
          <Collapse
            accordion
            expandIconPosition={"right"}
            expandIcon={({ isActive }) => (
              <LeftCircleTwoTone
                twoToneColor="#5d718d"
                style={{ fontSize: "26px" }}
                rotate={isActive ? -90 : 0}
              />
            )}
          >
            <Panel header="GRADUADO ESCOLAR" key="1">
              <h3>2006</h3>
              <h4>IFOC</h4>
              <p>Graduado en secundaria</p>
            </Panel>
          </Collapse>
        </Col>
      )}
    </div>
  );
}
