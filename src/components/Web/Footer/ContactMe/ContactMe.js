import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { subscribeContactApi, getMessagesApi } from "../../../../api/contact";
import { getAccessTokenApi } from "../../../../api/auth";
import { notifDelayErr } from "../../../../utils/notifications";
import { UserOutlined, QuestionOutlined } from "@ant-design/icons";

import "./ContactMe.scss";

export default function ContactMe() {
  const [inputs, setInputs] = useState({});
  const [order, setOrder] = useState();
  const token = getAccessTokenApi();

  getMessagesApi(token).then( async (result) => {
      const data =  result.messages.length + 1;
      await setOrder(data);
  });

  const onFinish = () => {
    let finalData = {
        email: inputs.email,
        subject: inputs.subject,
        order: order
    }
    const emailValid = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
    const resultValidation = emailValid.test(inputs.email);

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
    <div className="contact-me">
      <h3>Contacta conmigo :)</h3>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
            placeholder="Correo electrónico"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={
              <QuestionOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
            }
            placeholder="Asunto"
            value={inputs.subject}
            onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
