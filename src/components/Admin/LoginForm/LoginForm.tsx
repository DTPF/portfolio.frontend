import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { notifDelayErr } from "../../../utils/notifications";
import addNotification from 'react-push-notification';
import {
  emailValidation,
  minLenghtValidation,
} from "../../../utils/formValidation";
import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
  });
  const changeForm = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const inputValidation = (e: any) => {
    const { type, name } = e.target;
    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLenghtValidation(e.target, 6) });
    }
  };
  const login = async () => {
    const result = await signInApi(inputs);
    if(result.message) {
      notification["error"]({
        message: result.message,
        duration: notifDelayErr
      });
    } else {
      const {accessToken, refreshToken} = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      window.location.href = "/ad1988";
      addNotification({
        title: 'Accediendo desde '+inputs.email,
        native: true
      });
    }
  };
  return (
    <Form className="login-form" onFinish={login} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="login-form__input"
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Button type="link" htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
