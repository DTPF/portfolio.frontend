import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGetMenu from "../../../hooks/useGetMenu";
import { Row, Col } from "antd";
import "./CategoriesBigButtons.scss";
import Spin from "../../../components/UI/Spin";

export default function CategoriesBigButtons(props: any) {
  const { location, extra } = props;
  const menuData: any = useGetMenu(location);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsLoading(true);
    }
    window.scrollTo(0, 0);
    return () => { unmounted = true };
  }, []);
  return (
    <>
      {!isLoading ? (
        <Spin />
      ) : (
        <Row className={`categories-big-buttons ${extra}`}>
          <RenderButton menuData={menuData} />
        </Row>
      )}
    </>
  );
}

function RenderButton(props: any) {
  const { menuData } = props;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setIsLoading(true);
    }
    window.scrollTo(0, 0);
    return () => { unmounted = true };
  }, []);
  return (
    <>
      {!isLoading ? (
        <Spin />
      ) : (
        <>
          {menuData.length === 0 ? (
            <Spin paddingTop="40px" />
          ) : (
            <>
              {menuData.map((item: any) => {
                let classname: string = item.url.split("/")[1];
                const subtitle = () => {
                  if (classname === "education") {
                    return "Desde que decidí introducirme en este mundo";
                  }
                  if (classname === "curriculum") {
                    return "Trayectoria profesional";
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
      )}
    </>
  );
}
