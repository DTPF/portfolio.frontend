import React, { useState } from "react";
import { subscribeContactApi } from "../../../../../api/contact";
import { reloadMessagesTrueApi } from "../../../../../api/utils";
import { gaEvent } from "../../../../../utils/analytics.js";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import "./ContactMe.scss";
import {
  emailValidation,
  emailValidationClass,
  isNumberValidation,
  isNotNumberValidationClass
} from "../../../../../utils/formValidation";

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
  const [formValid, setFormValid] = useState({
    email: false,
    message: false,
  });
  const inputValidation = (e: any) => {
    const { type, name } = e.target;
    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidationClass(e.target, "noInitialClass") });
    }

    if (type === "textarea") {
      setFormValid({
        ...formValid,
        [name]: isNotNumberValidationClass(e.target, "noSuccessClass"),
      });
    }
  };
  const onFinish = () => {
    let finalData = {
      email: inputs.email,
      message: inputs.message,
    };
    let inputEmail = inputs.email;
    let inputMessage = inputs.message;
    let emailSplit = inputEmail?.replace(/ /g, "");
    let resultValidation = emailValidation(emailSplit);
    let messageIsNum = isNumberValidation(inputMessage);
    let countWords = inputMessage && inputMessage.split(" ").length;
    if (!inputs.email && inputs.message === "ad1988") {
      window.location.href = "/ad1988";
    }
    if (!inputs.email && !inputs.message) {
      messageAnt.warn("Los dos campos son obligatorios.");
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
        } else if (countWords < 3) {
          messageAnt.warn("Especifica un poco más en el mensaje por favor.");
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
            .then(() => messageAnt.info( "Contestaré lo antes posible!!", 2.5 ));
          } else if (response.status === 500) {
            messageAnt.error(response.message);
        } else {
          messageAnt.warn(response.message);
        }
      });
    }
  };  
  const clickEmailFormFooter = () => {
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
          onInput={inputValidation}
          onClick={() => clickEmailFormFooter()}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
      </Form.Item>
      <Form.Item>
        <TextArea
          placeholder="Escribe aquí tu mensaje"
          autoSize={{ minRows: 1, maxRows: 6 }}
          maxLength={500}
          value={inputs.message}
          onInput={inputValidation}
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
