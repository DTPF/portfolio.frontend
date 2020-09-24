import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import SocialLinks from "../SocialLinks";
import { getMenuApi } from "./../../../api/menu";
import logoWhite from "../../../assets/img/svg/logo512.svg";
import { URL } from "../../../config/url";
import { MenuOutlined, CloseCircleOutlined } from "@ant-design/icons";

import "./MenuTop.scss";

function MenuTop(props) {
  const [menuData, setMenuData] = useState([]);
  const { menuCollapsed, setMenuCollapsed, location } = props;

  useEffect(() => {
    getMenuApi().then((response) => {
      let unmounted = false;
      const arrayMenu = [];
      if (!unmounted) {
        response.menu.forEach((item) => {
          item.active && arrayMenu.push(item);
        });
        setMenuData(arrayMenu);
      }
      return () => { unmounted = true }
    });
  }, []);

  const reload = () => {
    window.location.href = URL + " ";
  };

  return (
    <Menu defaultSelectedKeys={[location.pathname]} className="menu-top-web" mode="horizontal">
      <Menu.Item className="menu-top-web__logo">
        <Link to={"/"} onClick={reload}>
          <img src={logoWhite} alt="David Thomas Pizarro Frick" />
        </Link>
      </Menu.Item>
      <Menu.Item className="menu-top-web__item" key={['/']}>
        <Link to={"/home"}>
          Home
        </Link>
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
            <Link to={item.url}>{item.title}</Link>
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