import React from "react";
import { Result, Button } from "antd";
import "./Error404.scss";

export default function Error404(props: any) {
  const { title, subtitle, goBack } = props;
  return (
    <div className="error-ant">
      <Result
        status="404"
        title={title ? title : 404}
        subTitle={
          subtitle ? subtitle : "Lo sentimos, la página que visitas no existe."
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
