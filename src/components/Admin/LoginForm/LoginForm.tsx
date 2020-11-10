import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { notifDelayErr } from "../../../utils/notifications";
import {
  emailValidationClass,
  minLenghtValidationClass,
} from "../../../utils/formValidation";
import "./LoginForm.scss";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [countLogin, setCountLogin] = useState(0);
  const [timeToLogin, setTimeToLogin] = useState(0);
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
      setFormValid({ ...formValid, [name]: emailValidationClass(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLenghtValidationClass(e.target, 6) });
    }
  };
  const login = () => {
    if (countLogin > 10) {
      setTimeToLogin(30000);
    } 
    setIsLoading(true);
    setTimeout( async function () {
      let count = countLogin;
      setCountLogin(count + 1);
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
      }
      setIsLoading(false);
    }, timeToLogin);    
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
        <Button
          type="link"
          htmlType="submit"
          className="login-form__button"
          loading={isLoading}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
