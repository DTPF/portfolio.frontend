import React, { useState, useEffect } from "react";
import { getLastMessageApi } from "../../../api/contact";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Tag, message } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  ChromeOutlined,
  MessageOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./MenuSider.scss";
import { getAccessTokenApi } from "../../../api/auth";
import addNotification from "react-push-notification";
import useMessagesUnreadLength from "../../../webSockets/hooks/useMessagesUnreadLength";

function MenuSider(props: any) {
  const { menuCollapsed, location } = props;
  const messagesUnreadLength = useMessagesUnreadLength();  
  return (
    <RenderMenuSider
      messagesUnreadLength={messagesUnreadLength}
      menuCollapsed={menuCollapsed}
      location={location}
    />
  );
}

function RenderMenuSider(props: any) {
  const { messagesUnreadLength, menuCollapsed, location } = props;
  const [newMessage, setNewMessage] = useState(messagesUnreadLength);
  useEffect(() => {
    let unmounted = false;
    if (messagesUnreadLength !== undefined) {
      if (!unmounted) {
        setNewMessage(messagesUnreadLength);
      }
    }
    return () => { unmounted = true };
  }, [newMessage, messagesUnreadLength]);
  return (
    <NextRender
      menuCollapsed={menuCollapsed}
      location={location}
      messagesUnreadLength={messagesUnreadLength}
      newMessage={newMessage}
    />
  );
}

function NextRender(props: any) {
  const { menuCollapsed, location, messagesUnreadLength, newMessage } = props;
  const { Sider } = Layout;
  const token = getAccessTokenApi();
  useEffect(() => {
    getLastMessageApi(token).then((response) => {
      if (response.email) {
        if (newMessage < messagesUnreadLength) {
          message.success(`Mensaje de ${response.email}`, 5);
          addNotification({
            title: `Mensaje de ${response.email}`,
            native: true,
            duration: 10000,
          });
        }
      }
    });
  }, [messagesUnreadLength, newMessage, token]);
  return (
    <Sider
      collapsible
      collapsedWidth="0"
      breakpoint="lg"
      className="admin-sider"
      collapsed={menuCollapsed}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
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
            {messagesUnreadLength > 0 ? (
              <Tag className="admin-sider__tag">{messagesUnreadLength}</Tag>
            ) : (
              <></>
            )}
          </Link>
        </Menu.Item>
        <Menu.Item key="ad1988/courses">
          <Link to="/ad1988/courses">
            <ReadOutlined />
            <span className="nav-text">Formación</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/">
          <Link to={"/"}>
            <ChromeOutlined />
            <span className="nac-text">Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
