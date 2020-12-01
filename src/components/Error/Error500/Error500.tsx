import React from "react";
import { Result, Button } from "antd";
import "../Error.scss";

export default function Error500(props: {
  title?: string;
  subtitle?: string;
  urlHistory: any;
}) {
  const { title, subtitle, urlHistory } = props;
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
          <Button type="primary" onClick={urlHistory.goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}
