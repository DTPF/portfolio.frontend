import React, { useState, useEffect } from "react";
import { Menu, Button, notification } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { getMenuApi } from "../../../../api/menu";
import Logo from "../../../../assets/img/png/logo128.png";
import { 
  MenuOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import "./MenuTop.scss";
import SocialLinks from "../../SocialLinks";

function MenuTop(props) {
  const [menuData, setMenuData] = useState([]);
  const { menuCollapsed, setMenuCollapsed, location } = props;
  let pathname = location.pathname;
  const splitPathname = pathname.split("/")[2];
  useEffect(() => {
    let unmounted = false;
    getMenuApi().then((response) => {
      if (!unmounted) {
        if (response.status !== 200) {
          notification['error']({
            message: "Ha ocurrido un error en el servidor, vuelve más tarde y disculpa las molestias.",
            duration: 15
          });
        } else {
          const arrayMenu = [];
          response.menu && response.menu.forEach((item) => {
            item.active && arrayMenu.push(item);
          });
          setMenuData(arrayMenu);
        }
      }
      return () => {unmounted = true};
    });
  }, []);
  return (
    <Menu
      selectedKeys={[location.pathname]}
      className="menu-top-web"
      mode="horizontal"
    >
      <Menu.Item className="menu-top-web__logo">
        <NavLink to={"/"} >
          <img src={Logo} alt="Logo de David Thomas Pizarro Frick" />
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
          <Menu.Item key={splitPathname ? item.url+'/'+splitPathname : item.url} className="menu-top-web__item">
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