import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import useGetMainMenu from "../../../../hooks/useGetMainMenu";
import { gaEvent } from "../../../../utils/analytics.js";
import { Menu, Button } from "antd";
import Logo from "../../../../assets/img/png/logo128.png";
import {
  MenuOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import "./MenuTop.scss";
import SocialLinks from "../../SocialLinks";

function MenuTop(props: any) {
  const { mainMenu } = useGetMainMenu();
  const { menuCollapsed, setMenuCollapsed, location } = props;
  const clickMenuIcon = () => {
    gaEvent("click_menu_mobile_icon", "clicks", "UI Clicks", true);
  };  
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
      {mainMenu.map((item: any) => {
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
            onClick={() => {clickMenuIcon(); setMenuCollapsed(!menuCollapsed)}}
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