import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import "./Error.scss";

export default function Error(props: {
  title: string;
  subtitle: string;
}) {
  const { title, subtitle } = props;
  const goBack = useHistory().goBack;
  return (
    <div className="error-ant">
      <Result
        status="404"
        title={title ? title : 404}
        subTitle={subtitle ? subtitle : "Lo sentimos, la página que visitas no existe."}
        extra={
          <Button type="primary" onClick={goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}
