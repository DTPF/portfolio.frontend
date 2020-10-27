import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import useGetMenu from "../../../../hooks/useGetMenu";
import SocialLinks from "../../SocialLinks";
import "./MenuSider.scss";

function MenuSider(props: any) {
  const { menuCollapsed, setMenuCollapsed, location } = props;
  const menuData: any = useGetMenu();
  const { Sider } = Layout;
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
        {menuData.map((item: any) => {
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
