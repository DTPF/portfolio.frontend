import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import useGetMenu from "../../../hooks/useGetMenu";
import { Row, Col } from "antd";
import "./CategoriesBigButtons.scss";
const Spin = lazy(() => import("../../../components/Spin"));

export default function CategoriesBigButtons(props: any) {
  const { location, extra } = props;
  const menuData: any = useGetMenu(location);
  return (
    <Row className={`categories-big-buttons ${extra}`}>
      <>
        {menuData.length === 0 ? (
          <Suspense fallback={<></>}>
            <Spin paddingTop="40px"/>
          </Suspense>
          ) : (
          <>
              {menuData.map((item: any) => {
                let classname: string = item.url.split("/")[1];
                const subtitle = () => {
                  if (classname === "education") {
                    return "Desde que decidí introducirme en este mundo";
                  }
                  if (classname === "curriculum") {
                    return "Un resumen de mi trayectoría";
                  }
                  if (classname === "projects") {
                    return "Aún son pocos, pero crecerán";
                  }
                  if (classname === "about-me") {
                    return "Para que me puedas conocer mejor";
                  }
                  if (classname === "contact") {
                    return "¿Hablamos?";
                  }
                };
                return (
                  <Col span={24} md={11} key={item.url} className={classname}>
                    <Link to={item.url}>
                      <h1>{item.title}</h1>
                      <p>{subtitle()}</p>
                    </Link>
                  </Col>
                );
              })}
          </>
        )}
      </>
    </Row>
  );
}
