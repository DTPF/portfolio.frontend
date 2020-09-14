import React from "react";
import { logout } from "../../../api/auth";
import { Button } from "antd";
import Logo from "../../../assets/img/png/logo-white.png";
import { URL } from "../../../config/url";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  const reload = () => {
    window.location.href = URL + "ad1988";
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logo}
          alt="David Thomas Pizarro Frick"
          onClick={reload}
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {React.createElement(
            menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
