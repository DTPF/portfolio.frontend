import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { getMenuApi } from "../../../../api/menu";
import SocialLinks from "../../SocialLinks";
import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, setMenuCollapsed, location } = props;
  const [menuData, setMenuData] = useState([]);
  const { Sider } = Layout;
  useEffect(() => {
    let unmounted = false;
    getMenuApi().then((response) => {
      if (!unmounted) {
        if (response.status !== 200) {
          console.log("Error del servidor.");
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
    <Sider
      collapsible
      collapsedWidth="0"
      breakpoint="lg"
      className="menu-sider-web"
      collapsed={menuCollapsed}
      onClick={() => setMenuCollapsed(!menuCollapsed)}
    >
      <Menu selectedKeys={[location.pathname]}  mode="vertical">
        {menuData.map((item) => {
          const external = item.url.indexOf("http") > -1 ? true : false;
          if (external) {
            return (
              <Menu.Item key={item.url} className={"menu-sider-web__item"}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </Menu.Item>
            );
          }
          return (
            <Menu.Item key={item.url} className={"menu-sider-web__item"}>
              <Link to={item.url}>{item.title}</Link>
            </Menu.Item>
          );
        })}
        <div className="menu-sider-web__item-social-sider">
          <SocialLinks />
        </div>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
