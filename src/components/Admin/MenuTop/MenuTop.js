import React from "react";
import { Button } from "antd";
import Logo from "../../../assets/img/png/logo-white-200.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import "./MenuTop.scss";

export default function MenuTop() {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logo}
          alt="David Thomas Pizarro Frick"
        />
        <Button type="link" onClick={() => console.log("Menú")}>
          <MenuFoldOutlined />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={() => console.log("Desconexión")}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
