import React, { useState } from "react";
import { subscribeContactApi } from "../../../../../api/contact";
import { reloadMessagesTrueApi } from "../../../../../api/utils";
import { gaEvent } from "../../../../../utils/analytics.js";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import "./ContactMe.scss";

export default function ContactMe() {
  const [inputs, setInputs] = useState({});
  return (
    <div className="contact-me">
      <h3>Contacta conmigo&nbsp;<SmileOutlined /></h3>
      <RenderForm inputs={inputs} setInputs={setInputs} />
    </div>
  );
}

function RenderForm(props: any) {
  const messageAnt : any = message;
  const { inputs, setInputs } = props;
  const { TextArea } : any = Input;
  const onFinish = () => {
    let finalData = {
      email: inputs.email,
      message: inputs.message,
    };
    let inputEmail = inputs.email;
    let inputMessage = inputs.message;
    let replaceTab = inputEmail?.replace(" ", "");
    let emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
    let messageIsNum = /^\d+$/.test(inputMessage);
    let howManyTabs = inputMessage && inputMessage.split(" ").length;
    let resultValidation = emailValid.test(replaceTab);
    if (!inputs.email && inputs.message === "ad1988") {
      window.location.href = "/ad1988";
    }
    if (!inputs.email && !inputs.message) {
      messageAnt.warn("Los dos campos son necesarios.");
    } else if (!resultValidation) {
      messageAnt.warn("El email no es válido.");
    } else if (messageIsNum) {
      setInputs({email: "Desplegando misiles...", message: 'Cuenta atrás iniciada...'});
      messageAnt
        .loading("Enviando mensaje...", 1.5)
        .then(() => messageAnt.warn("Un momento...", 2))
        .then(() => messageAnt.loading("Desplegando misiles...", 2.5))
        .then(() =>
        messageAnt.error(
          `Codigo de Autodestrucción Activado. Desplegando misiles en ${inputMessage} segundos...`, 3.5),
          setTimeout(() => {
            messageAnt.info("!!Es broma!! Sigue con lo que estabas haciendo :)", 2)
            setInputs({email: inputEmail, message: inputMessage})
          }, 10000),
          );
        } else if (howManyTabs < 3) {
          messageAnt.warn("Especifica un poco más por favor.");
    } else {
      subscribeContactApi(finalData).then( async (response) => {
        if (response.status === 200) {
          await reloadMessagesTrueApi();
          setInputs({email: "", message: response.message});
          setTimeout(() => {
            setInputs({email: "", message: ""});
          }, 4000);
          messageAnt
            .success("Enviado correctamente!!", 1.5)
            .then(() => message.info( "Contestaré lo antes posible!!", 2.5 ));
          } else if (response.status === 500) {
            messageAnt.error(response.message);
        } else {
          messageAnt.warn(response.message);
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
          allowClear
          value={inputs.email}
          onClick={() => clickMenuIcon()}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
      </Form.Item>
      <Form.Item>
        <TextArea
          placeholder="Escribe aquí tu mensaje"
          autoSize={{ minRows: 1, maxRows: 6 }}
          allowClear
          maxLength={500}
          value={inputs.message}
          onChange={(e: any) => setInputs({ ...inputs, message: e.target.value })}
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
