import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { notifDelay, notifDelayErr } from "../../../utils/notifications";
import { emailValidationClass, minLenghtValidationClass } from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";
import "./RegisterForm.scss";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });
  const changeForm = (e: any) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const inputValidation = (e: any) => {
    const { type, name } = e.target;
    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidationClass(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLenghtValidationClass(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };
  const register = async () => {
    setIsLoading(true);
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;
    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      if (emailVal && passwordVal && repeatPasswordVal && !privacyPolicyVal) {
        notification["warning"]({
          message: "Acepta nuestra política de privacidad",
          duration: notifDelayErr
        });
      } else {
        notification["warning"]({
          message: "Todos los campos son obligatorios",
          duration: notifDelayErr
        });
      }
      setIsLoading(false);
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["warning"]({
          message: "Las contraseñas tienen que ser iguales",
          duration: notifDelayErr
        });
        setIsLoading(false);
      } else {
        const result = await signUpApi(inputs);
        if (result.status === 200) {
          notification["success"]({
            message: result.message,
            duration: notifDelay
          });
          setIsLoading(false);
          resetForm();
        } else {
          const typeNotification = result.status === 500 ? "error" : "warning";
          notification[typeNotification]({
            message: result.message,
            duration: notifDelayErr
          });
          setIsLoading(false);
        }
      }
    }
  };
  const resetForm = () => {
    const input: any = document.getElementsByTagName("input");
    let inputsType: any = inputs;
    for (let i = 0; i < inputsType.length; i++) {
      input[i].className.remove("success");
      input[i].className.remove("error");
    }
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });
    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };
  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leído y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="link" htmlType="submit" className="register-form__button" loading={isLoading}>
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
