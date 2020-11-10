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

export default function ContactForm(props: any) {
  const { TextArea } = Input;
  const Form: any = FormAnt;
  const messageAnt: any = msg;
  let removeclassName: any = document.getElementsByClassName("ant-input");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    phoneNumber: false,
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
    const { name, email, phone_number, message } = inputs;
    let finalData = {
      name: name,
      email: email,
      phone_number: phone_number,
      message: message,
    };
    let nameIsNumberValidat = isNumberValidation(name);
    let nameMinLengthValidat = minLenghtValidation(name, 3, "notRequierd");
    let emailValidat = emailValidation(email);
    let phoneValidat = isPhoneNumberValidation(phone_number, "notRequierd");
    let messageValidat = isNumberValidation(message);
    let countWords = message && message.split(" ").length;
    if (nameIsNumberValidat) {
      messageAnt.warn(`Seguro que te llamas ${name}??`);
    } else if (!nameMinLengthValidat) {
      messageAnt.warn("El nombre requiere un mínimo de 3 carácteres.");
    } else if (!emailValidat) {
      messageAnt.warn("El email no es correcto.");
    } else if (!phoneValidat) {
      messageAnt.warn("El número de teléfono no es correcto.");
    } else if (!message) {
      messageAnt.warn("El mensaje es obligatorio.");
    } else if (messageValidat) {
      messageAnt.warn("El mensaje no pueden ser todo números...");
    } else if (!email && !message) {
      messageAnt.warn("El email y el mensaje son obligatorios.");
    } else if (countWords < 3) {
      messageAnt.warn("Especifica un poco más en el mensaje por favor.");
    } else {
      await subscribeContactApi(finalData).then(async (response) => {
        if (response.status === 200) {
          await reloadMessagesTrueApi();
          for (let i = 0; i < removeclassName.length; i++) {
            removeclassName[i].classList.remove("success");
            removeclassName[i].classList.remove("error");
          }
          setInputs({ name: "", email: "", phone_number: "", message: "" });
          messageAnt
            .success("Enviado correctamente!!", 1.5)
            .then(() => messageAnt.info("Contestaré lo antes posible!!", 2.5));
        } else if (response.status === 500) {
          messageAnt.error(response.message);
        } else {
          messageAnt.warn(response.message);
        }
      });
    }
  };
  const resetForm = () => {
    setInputs({ name: "", email: "", phone_number: "", message: "" });
    for (let i = 0; i < removeclassName.length; i++) {
      removeclassName[i].classList.remove("success");
      removeclassName[i].classList.remove("error");
    }
  };
  return (
    <Form name="contact-message" onFinish={onFinish}>
      <Row className="contact__form">
        <Col span={24} lg={12} className="contact__form-column-left">
          <Form.Item label="Nombre">
            <Input
              type="text"
              name="name"
              value={inputs.name}
              onInput={inputValidation}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="*Email">
            <Input
              type="email"
              value={inputs.email}
              onInput={inputValidation}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Teléfono">
            <Input
              type="tel"
              value={inputs.phone_number}
              onInput={inputValidation}
              onChange={(e) =>
                setInputs({ ...inputs, phone_number: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={24} lg={12} className="contact__form-column-right">
          <Form.Item label="*Mensaje">
            <TextArea
              autoSize={{ minRows: 6, maxRows: 16 }}
              value={inputs.message}
              onInput={inputValidation}
              onChange={(e) =>
                setInputs({ ...inputs, message: e.target.value })
              }
            />
          </Form.Item>
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
