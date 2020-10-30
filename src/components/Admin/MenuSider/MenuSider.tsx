import React, { useState, useEffect } from "react";
import { getMessagesUnreadApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Tag, notification } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  ChromeOutlined,
  MessageOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./MenuSider.scss";
import addNotification from "react-push-notification";

function MenuSider(props: any) {
  const { menuCollapsed, location } = props;
  const [messagesUnread, setMessagesUnread] = useState({});
  const token = getAccessTokenApi();
  useEffect(() => {
    let unmounted = false;
    const interval = setInterval(() => {
      getMessagesUnreadApi(token, false).then((response) => {
        if (!unmounted) {
          setMessagesUnread(response.messages);
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      unmounted = true;
    };
  }, [token]);
  return (
    <RenderMenuSider
      messagesUnread={messagesUnread}
      menuCollapsed={menuCollapsed}
      location={location}
    />
  );
}

function RenderMenuSider(props: any) {
  const { messagesUnread, menuCollapsed, location } = props;
  const [messagesUnreadLength, setMessagesUnreadLength] = useState(0);
  const [newMessage, setNewMessage] = useState(0);
  let lastMessage = messagesUnread && messagesUnread[0];
  const lastMessageEmail = lastMessage && lastMessage.email;
  const { Sider } = Layout;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (messagesUnread) {
        setMessagesUnreadLength(messagesUnread.length);
        setNewMessage(messagesUnreadLength);
        if (newMessage < messagesUnreadLength) {
          notification["success"]({
            message: `Mensaje de ${lastMessageEmail}`,
          });
          addNotification({
            title: `Mensaje de ${lastMessageEmail}`,
            native: true,
          });
        }
      } else {
        notification["error"]({
          message: `Error del servidor.`,
        });
      }
    }
    return () => { unmounted = true };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesUnread]);
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
            {messagesUnreadLength ? (
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
