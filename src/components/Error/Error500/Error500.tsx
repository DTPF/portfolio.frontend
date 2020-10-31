import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { URL } from "../../../config/url";
import "./Error500.scss";

export default function Error500(props: any) {
  const { title, subtitle } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBack = () => {
    window.location.href = URL;
  };
  return (
    <div className="error-ant">
      <Result
        status="500"
        title={title ? title : "Ups! Error del servidor..."}
        subTitle={
          subtitle
            ? subtitle
            : "Lo siento, ha ocurrido un error en el servidor, vuelve más tarde."
        }
        extra={
          <Button type="primary" onClick={goBack}>
            Recargar
          </Button>
        }
      />
    </div>
  );
}
