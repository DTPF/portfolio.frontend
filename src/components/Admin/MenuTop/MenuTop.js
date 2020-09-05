import React from "react";
import { Button } from "antd";
import Logo from "../../../assets/img/png/logo-white.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logo}
          alt="David Thomas Pizarro Frick"
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {React.createElement(
            menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
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
