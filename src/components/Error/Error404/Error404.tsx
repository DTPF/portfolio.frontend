import React from "react";
import { Result, Button } from "antd";
import "../Error.scss";

export default function Error404(props: {
  title?: string;
  subtitle?: string;
  urlHistory: any;
}) {
  const { title, subtitle, urlHistory } = props;
  return (
    <div className="error-ant">
      <Result
        status="404"
        title={title ? title : "Ups! Página no encontrada..."}
        subTitle={
          subtitle ? subtitle : "Lo siento, la página que buscas no existe."
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
