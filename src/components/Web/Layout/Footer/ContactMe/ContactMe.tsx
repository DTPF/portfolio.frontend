import React, { useState } from "react";
import { Form, Input, Button, message as messageAnt } from "antd";
import { subscribeContactApi } from "../../../../../api/contact";
import { reloadMessagesTrueApi } from "../../../../../api/utils";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { gaEvent } from "../../../../../utils/analytics.js";
import "./ContactMe.scss";

export default function ContactMe() {
  const [inputs, setInputs] = useState({});
  return (
    <div className="contact-me">
      <h3>{"Contacta conmigo :)"}</h3>
      <RenderForm inputs={inputs} setInputs={setInputs} />
    </div>
  );
}

function RenderForm(props: any) {
  const message : any = messageAnt;
  const { inputs, setInputs } = props;
  const onFinish = async () => {
    await reloadMessagesTrueApi();
    let finalData = {
      email: inputs.email,
      subject: inputs.subject,
    };
    let inputEmail = inputs.email;
    let inputSubject = inputs.subject;
    let replaceTab = inputEmail?.replace(" ", "");
    let emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
    let subjectIsNum = /^\d+$/.test(inputSubject);
    let howManyTabs = inputSubject && inputSubject.split(" ").length;
    let resultValidation = emailValid.test(replaceTab);
    if (!inputs.email && inputs.subject === "ad1988") {
      window.location.href = "/ad1988";
    }
    if (!inputs.email && !inputs.subject) {
      message.warning("Los dos campos son requeridos.");
    } else if (!resultValidation) {
      message.warning("El email no es válido.");
    } else if (subjectIsNum) {
      setInputs({email: "Desplegando misiles...", subject: 'Cuenta atrás iniciada...'});
      message
        .loading("Enviando mensaje...", 1.5)
        .then(() => message.warning("Un momento...", 2))
        .then(() => message.loading("Desplegando misiles...", 2.5))
        .then(() =>
        message.error(
          `Codigo de Autodestrucción Activado. Desplegando misiles en ${inputSubject} segundos...`, 3.5),
          setTimeout(() => {
            message.info("!!Es broma!! Sigue con lo que estabas haciendo :)", 6)
            setInputs({email: inputEmail, subject: inputSubject})
          }, 13000),
          );
    } else if (howManyTabs < 3) {
      message.warning("Especifica un poco más por favor.");
    } else {
      subscribeContactApi(finalData).then((response) => {
        if (response.status === 200) {
          message
            .loading("Enviando mensaje...", 1.5)
            .then(() => message.success("Enviado correctamente!!", 2.5))
            .then(() => message.info( "Contestaré lo antes posible!!", 2.5 ));
          setInputs("");
        } else if (response.status === 500) {
          message.error(response.message);
        } else {
          message.warning(response.message);
        }
      });
    }
  };

  const clickMenuIcon = () => {
    gaEvent("click_email_contact_me_footer", "clicks", "UI Clicks", true);
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <Input
          type="email"
          name="email"
          prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
          placeholder="Correo electrónico"
          value={inputs.email}
          onClick={() => clickMenuIcon()}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          name="text"
          prefix={<MailOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
          placeholder="Asunto"
          value={inputs.subject}
          onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
