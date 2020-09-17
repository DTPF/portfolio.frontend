import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { 
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  ChromeOutlined,
  MessageOutlined
} from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;
  return (
    <Sider
      collapsible
      collapsedWidth="0"
      breakpoint="lg"
      className="admin-sider"
      collapsed={menuCollapsed}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} >
        <Menu.Item key="/ad1988">
          <Link to={"/ad1988"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/ad1988/users">
          <Link to={"/ad1988/users"}>
            <UserOutlined />
            <span className="nac-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/ad1988/menu">
          <Link to={"/ad1988/menu"}>
            <MenuOutlined />
            <span className="nac-text">Menú</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="ad1988/contact-messages">
          <Link to="/ad1988/contact-messages">
            <MessageOutlined />
            <span className="nav-text">Mensajes</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/home">
          <Link to={"/home"}>
            <ChromeOutlined />
            <span className="nac-text">Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);