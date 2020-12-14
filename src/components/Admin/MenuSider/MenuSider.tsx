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
const sound = require("../../../assets/audio/sound.mp3");
const soundOGG = require("../../../assets/audio/sound.ogg");

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
    let isMounted = true;
    if (messagesUnreadLength !== undefined) {
      isMounted && setNewMessage(messagesUnreadLength);
    }
    return () => { isMounted = false };
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
  const playSound = () => {
    const a : any = document.getElementById('sound');
    a.play();
  }
  useEffect(() => {
    getLastMessageApi(token).then((response) => {
      if (response.email) {
        if (newMessage < messagesUnreadLength) {
            message.success(`Mensaje de ${response.email}`, 5);
            addNotification({
              title: `Mensaje de ${response.email}`,
              native: true,
              duration: 5000
            });
            playSound();
          }
        }  
    });
  }, [messagesUnreadLength, newMessage, token]);
  return (
    <>
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
          <Menu.Item key="ad1988/education">
            <Link to="/ad1988/education">
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
      <audio id="sound" preload="auto">
        <source src={sound} type="audio/mpeg" />
        <source src={soundOGG} type='audio/ogg' />
        <embed hidden={true} src={sound} />
      </audio>
    </>
  );
}

export default withRouter(MenuSider);
