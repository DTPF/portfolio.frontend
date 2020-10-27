import React from "react";
import useGetMenu from "../../../../hooks/useGetMenu";
import { Menu, Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import Logo from "../../../../assets/img/png/logo128.png";
import { 
  MenuOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import "./MenuTop.scss";
import SocialLinks from "../../SocialLinks";

function MenuTop(props: any) {
  const menuData: any = useGetMenu();
  const { menuCollapsed, setMenuCollapsed, location } = props;
  let pathname = location.pathname;
  const splitPathname = pathname.split("/")[2];
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
      {menuData.map((item: any) => {
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