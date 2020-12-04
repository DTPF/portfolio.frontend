/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Row, Col, Form as FormAnt, Input, Button, message as msg } from "antd";
import "./ContactForm.scss";
import { subscribeContactApi } from "../../../../api/contact";
import { reloadMessagesTrueApi } from "../../../../api/utils";
import {
  emailValidation,
  emailValidationClass,
  minLenghtValidation,
  isNumberValidation,
  isNotNumberValidationClass,
  isPhoneNumberValidation,
  isPhoneNumberValidationClass,
  minLenghtIsNotNumberValidationClass,
} from "../../../../utils/formValidation";
import { RedoOutlined } from "@ant-design/icons";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const { TextArea } = Input;
  const Form: any = FormAnt;
  const messageAnt: any = msg;
  const removeclassName: any = document.getElementsByClassName("ant-input");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });
  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    subject: false,
    message: false,
  });
  const inputValidation = (e: any) => {
    const { type, name } = e.target;
    if (type === "text") {
      setFormValid({
        ...formValid,
        [name]: minLenghtIsNotNumberValidationClass(e.target, 3, "notRequired"),
      });
    }
    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidationClass(e.target) });
    }
    if (type === "tel") {
      setFormValid({
        ...formValid,
        [name]: isPhoneNumberValidationClass(e.target, "notRequired"),
      });
    }
    if (type === "textarea") {
      setFormValid({
        ...formValid,
        [name]: isNotNumberValidationClass(e.target, "noSuccessClass"),
      });
    }
  };
  const onFinish = async (e: any) => {
    const { name, email, phone_number, subject, message } = inputs;
    const emailReplace = email.replace(/ /g, "");
    let finalData = {
      name: name ? name : "Anónimo",
      email: emailReplace,
      phone_number: phone_number ? phone_number : "Ninguno",
      subject: subject ? subject : "Sin asunto",
      message: message,
    };
    const nameIsNumberValidat = isNumberValidation(name);
    const nameMinLengthValidat = minLenghtValidation(name, 3, "notRequierd");
    const emailValidat = emailValidation(emailReplace);
    const phoneValidat = isPhoneNumberValidation(phone_number, "notRequierd");
    const subjectReplace = subject.replace(/ /g, "");
    const subjectIsNumberValidat = isNumberValidation(subjectReplace);
    const subjectMinLengthValidat = minLenghtValidation(
      subject,
      3,
      "notRequierd"
    );
    const messageReplace = message.replace(/ /g, "");
    const messageIsNumberValidat = isNumberValidation(messageReplace);
    const messageMinLengthValidat = minLenghtValidation(
      message,
      3,
      "notRequierd"
    );
    const countWords = message && message.split(" ").length;
    if (nameIsNumberValidat) {
      messageAnt.warn(`Seguro que te llamas ${name}??`);
    } else if (!nameMinLengthValidat) {
      messageAnt.warn("El nombre requiere un mínimo de 3 carácteres.");
    } else if (!email && !message) {
      messageAnt.warn("El email y el mensaje son obligatorios.");
    } else if (!email) {
      messageAnt.warn("El email es obligatorio.");
    } else if (!emailValidat) {
      messageAnt.warn("El email no es correcto.");
    } else if (!phoneValidat) {
      messageAnt.warn("El número de teléfono no es correcto.");
    } else if (!message) {
      messageAnt.warn("El mensaje es obligatorio.");
    } else if (!subjectMinLengthValidat) {
      messageAnt.warn("El asunto requiere un mínimo de 3 carácteres.");
    } else if (subjectIsNumberValidat) {
      messageAnt.warn("El asunto no pueden ser todo números...");
    } else if (!messageMinLengthValidat) {
      messageAnt.warn("El mensaje requiere un mínimo de 3 carácteres.");
    } else if (messageIsNumberValidat) {
      messageAnt.warn("El mensaje no pueden ser todo números...");
    } else if (!email && !message) {
      messageAnt.warn("El email y el mensaje son obligatorios.");
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
                console.log(`%c${response.text}`, "color: green");
              },
              (err) => {
                console.log("FAILED...", err);
              }
            );
          await reloadMessagesTrueApi();
          for (let i = 0; i < removeclassName.length; i++) {
            removeclassName[i].classList.remove("success");
            removeclassName[i].classList.remove("error");
          }
          setInputs({
            name: "",
            email: "",
            phone_number: "",
            subject: "",
            message: "",
          });
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
  const resetForm = () => {
    setInputs({
      name: "",
      email: "",
      phone_number: "",
      subject: "",
      message: "",
    });
    for (let i = 0; i < removeclassName.length; i++) {
      removeclassName[i].classList.remove("success");
      removeclassName[i].classList.remove("error");
    }
  };
  return (
    <Form name="contact-message" onFinish={onFinish}>
      <Row className="contact__form">
        <Col span={24} lg={12} className="contact__form-column-left">
          <div className="contact__form-item">
            <div className="contact__form-item-label">
              <label title="email">
                <span>*&nbsp;</span>Email
              </label>
            </div>
            <Form.Item>
              <Input
                type="email"
                name="email"
                value={inputs.email}
                onInput={inputValidation}
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
                }}
              />
            </Form.Item>
          </div>
          <div className="contact__form-item">
            <div className="contact__form-item-label">
              <label title="name">Nombre</label>
            </div>
            <Form.Item>
              <Input
                type="text"
                name="name"
                value={inputs.name}
                onInput={inputValidation}
                onChange={(e) => {
                  setInputs({ ...inputs, name: e.target.value });
                }}
              />
            </Form.Item>
          </div>
          <div className="contact__form-item">
          <div className="contact__form-item-label">
            <label title="phone_number">Teléfono</label>
            </div>
            <Form.Item>
              <Input
                type="tel"
                name="phone_number"
                value={inputs.phone_number}
                onInput={inputValidation}
                onChange={(e) =>
                  setInputs({ ...inputs, phone_number: e.target.value })
                }
              />
            </Form.Item>
          </div>
          <div className="contact__form-item">
          <div className="contact__form-item-label">
            <label title="subject">Asunto</label>
            </div>
            <Form.Item>
              <Input
                type="text"
                name="subject"
                value={inputs.subject}
                onInput={inputValidation}
                onChange={(e) =>
                  setInputs({ ...inputs, subject: e.target.value })
                }
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={24} lg={12} className="contact__form-column-right">
          <div className="contact__form-item">
          <div className="contact__form-item-label">
            <label title="message">
              <span>*&nbsp;</span>Mensaje
            </label>
            </div>
            <Form.Item>
              <TextArea
                autoSize={{ minRows: 8, maxRows: 16 }}
                value={inputs.message}
                onInput={inputValidation}
                onChange={(e) =>
                  setInputs({ ...inputs, message: e.target.value })
                }
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={24} className="contact__form-button">
          <Form.Item>
            {(inputs.name ||
              inputs.email ||
              inputs.phone_number ||
              inputs.message) && (
              <Button
                type="primary"
                className="contact__form-button-reset"
                onClick={resetForm}
              >
                <RedoOutlined />
              </Button>
            )}
            <Button
              type="primary"
              htmlType="submit"
              className="contact__form-button-submit"
            >
              Enviar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
