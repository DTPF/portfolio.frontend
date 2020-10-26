import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  subscribeContactApi,
  getMessagesApi,
} from "../../../../../api/contact";
import { notifDelayErr } from "../../../../../utils/notifications";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import "./ContactMe.scss";

export default function ContactMe() {
  const [inputs, setInputs] = useState({});
  const [order, setOrder] = useState(0);  
  return (
    <div className="contact-me">
      <h3>{"Contacta conmigo :)"}</h3>
      <RenderForm
        inputs={inputs}
        setInputs={setInputs}
        order={order}
        setOrder={setOrder}
      />
    </div>
  );
}

function RenderForm(props: any) {
  const { inputs, setInputs, order, setOrder } = props;
  const onFinish = () => {
    getMessagesApi().then((res) => {
      let data = res.messages + 1;
      setOrder(data);
    });
    let finalData = {
      email: inputs.email,
      subject: inputs.subject,
      order: order,
    };
    let inputEmail: string = inputs.email;
    let inputSubject = inputs.subject;
    let replaceTab = inputEmail?.replace(" ", "");
    let emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
    let subjectIsNum = /^\d+$/.test(inputSubject);
    let howManyTabs = inputSubject.split(" ").length;
    let resultValidation = emailValid.test(replaceTab);
    if (!inputs.email && !inputs.subject) {
      notification["warning"]({
        message: "Los dos campos son requeridos.",
        duration: notifDelayErr,
      });
    } else if (!resultValidation) {
      notification["warning"]({
        message: "El email no es válido.",
        duration: notifDelayErr,
      });
    } else if (subjectIsNum) {
      notification["warning"]({
        message: "¿Es un código secreto? No entiendo el asunto...",
        duration: notifDelayErr,
      });
    } else if (howManyTabs < 3) {
      notification["warning"]({
        message: "Especifica un poco más por favor.",
        duration: notifDelayErr,
      });
    } else {
      subscribeContactApi(finalData).then((response) => {
        if (response.status === 200) {
          notification["success"]({
            message:
              "!Enviado correctamente! Contestaré en la mayor brevedad posible.",
            duration: 5,
          });
          setInputs("");
        } else if (response.status === 500) {
          notification["error"]({
            message: response.message,
            duration: notifDelayErr,
          });
        } else {
          notification["warning"]({
            message: response.message,
            duration: notifDelayErr,
          });
        }
      });
    }
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
