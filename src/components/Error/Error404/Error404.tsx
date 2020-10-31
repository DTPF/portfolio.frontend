import React, { useEffect } from "react";
import { Result, Button } from "antd";
import "./Error404.scss";

export default function Error404(props: any) {
  const { title, subtitle, goBack } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="error-ant">
      <Result
        status="404"
        title={title ? title : "Ups! Página no encontrada..."}
        subTitle={
          subtitle ? subtitle : "Lo siento, la página que buscas no existe."
        }
        extra={
          <Button type="primary" onClick={goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}
