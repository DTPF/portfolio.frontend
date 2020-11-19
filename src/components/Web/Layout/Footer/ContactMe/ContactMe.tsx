import React, { useState } from "react";
import { subscribeContactApi } from "../../../../../api/contact";
import { reloadMessagesTrueApi } from "../../../../../api/utils";
import { gaEvent } from "../../../../../utils/analytics.js";
import { Cookies } from "react-cookie";
import { Form, Input, Button, message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./ContactMe.scss";
import {
  emailValidation,
  emailValidationClass,
  isNumberValidation,
  isNotNumberValidationClass,
} from "../../../../../utils/formValidation";
import emailjs from "emailjs-com";

export default function ContactMe() {
  const [inputs, setInputs] = useState({});
  return (
    <div className="contact-me">
      <span className="contact-me__title">
        Contacta conmigo&nbsp;
        <SmileOutlined />
      </span>
      <RenderForm inputs={inputs} setInputs={setInputs} />
    </div>
  );
}

function RenderForm(props: any) {
  const { inputs, setInputs } = props;
  const cookie = new Cookies();
  const _gaCookies = cookie.get("_gaCookies");
  const messageAnt: any = message;
  const { TextArea }: any = Input;
  const [formValid, setFormValid] = useState({
    email: false,
    message: false,
  });
  const inputValidation = (e: any) => {
    const { type, name } = e.target;
    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidationClass(e.target, "noInitialClass"),
      });
    }
    if (type === "textarea") {
      setFormValid({
        ...formValid,
        [name]: isNotNumberValidationClass(e.target, "noSuccessClass"),
      });
    }
  };
  const onFinish = async () => {
    const { email, message } = inputs;
    const emailReplace = email?.replace(/ /g, "");
    const finalData = {
      name: "Anónimo",
      email: emailReplace,
      subject: "Sin asunto",
      message: message,
    };
    const mailIsMail = emailValidation(emailReplace);
    const messageReplace = message?.replace(/ /g, "");
    const messageIsNum = isNumberValidation(messageReplace);
    const countWords = message && message.split(" ").length;
    if (!email && message === "1988") {
      window.location.href = "/ad1988";
    } else if (!_gaCookies) {
      messageAnt.warn("Acepta las cookies para enviar el mensaje.");
    } else if (!email && !message) {
      messageAnt.warn("El email y el mensaje son obligatorios.");
    } else if (!email) {
      messageAnt.warn("El email es obligatorio.");
    } else if (!message) {
      messageAnt.warn("El mensaje es obligatorio.");
    } else if (!mailIsMail) {
      messageAnt.warn("El email no es válido.");
    } else if (messageIsNum) {
      setInputs({
        email: "Autodestrucción...",
        message: "Cuenta atrás iniciada...",
      });
      messageAnt
        .loading("Enviando mensaje...", 1.5)
        .then(() => messageAnt.warn("Un momento...", 1))
        .then(() => messageAnt.loading("Desplegando misiles...", 2))
        .then(
          () =>
            messageAnt.error(
              `Codigo de Autodestrucción Activado. Desplegando misiles en ${message} segundos...`,
              3.5
            ),
          setTimeout(() => {
            messageAnt.info(
              "!!Es broma!! Sigue con lo que estabas haciendo :)",
              2
            );
            setInputs({ email: email, message: message });
          }, 10000)
        );
    } else if (countWords < 3) {
      messageAnt.warn("Especifica un poco más en el mensaje por favor.");
    } else {
      await subscribeContactApi(finalData).then(async (response) => {
        if (response.status === 200) {
          emailjs
            .send(
              "default_service",
              "template_2uj79vj",
              finalData,
              "user_EKNrzyANZUei9pNTOFMd6"
            )
            .then(
              (response) => {
                console.log(response.text);
              },
              (err) => {
                console.log("FAILED...", err);
              }
            );
          await reloadMessagesTrueApi();
          setInputs({ email: "", message: response.message });
          setTimeout(() => {
            setInputs({ email: "", message: "" });
          }, 3000);
          messageAnt
            .success("Enviado correctamente!!", 1.5)
            .then(() => messageAnt.info("Contestaré lo antes posible!!", 2.5));
        } else if (response.status === 500) {
          messageAnt.error(response.message);
        } else {
          if (response.message === "Failed to fetch") {
            messageAnt.error("No se ha podido enviar el mensaje.", 2)
              .then(() => messageAnt.warn("Comprueba tu conexión a internet."));
          } else {
            messageAnt.warn(response.message);
          }
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
          onChange={(e: any) =>
            setInputs({ ...inputs, message: e.target.value })
          }
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
