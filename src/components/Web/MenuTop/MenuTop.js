import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { URL } from "../../../config/url";
import { getMenuApi } from "./../../../api/menu";
import SocialLinks from "../SocialLinks";
import logoWhite from "../../../assets/img/webp/logo512.webp";
import { 
  MenuOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";

import "./MenuTop.scss";

function MenuTop(props) {
  const [menuData, setMenuData] = useState([]);
  const { menuCollapsed, setMenuCollapsed, location } = props;

  useEffect(() => {
    let unmounted = false;
    getMenuApi().then((response) => {
      if (!unmounted) {
        const arrayMenu = [];
        response.menu.forEach((item) => {
          item.active && arrayMenu.push(item);
        });
        setMenuData(arrayMenu);
      }
      return () => {unmounted = true};
    });
  }, []);

  const reload = () => {
    window.location.href = URL + " ";
  };

  return (
    <Menu
      selectedKeys={[location.pathname]}
      className="menu-top-web"
      mode="horizontal"
    >
      <Menu.Item className="menu-top-web__logo">
        <NavLink to={"/"} onClick={reload}>
          <img src={logoWhite} alt="David Thomas Pizarro Frick" />
        </NavLink>
      </Menu.Item>
      {menuData.map((item) => {
        const external = item.url.indexOf("http") > -1 ? true : false;
        if (external) {
          return (
            <Menu.Item key={item.url} className="menu-top-web__item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key={item.url} className="menu-top-web__item">
            <NavLink to={item.url}>{item.title}</NavLink>
          </Menu.Item>
        );
      })}
      <div>
        <div className="menu-top-web__item-social">
          <SocialLinks />
        </div>
        <div>
          <Button
            type="link"
            className="menu-top-web__menu"
            onClick={() => setMenuCollapsed(!menuCollapsed)}
          >
            {React.createElement(
              menuCollapsed ? MenuOutlined : CloseCircleOutlined
            )}
          </Button>
        </div>
      </div>
    </Menu>
  );
}

export default withRouter(MenuTop);