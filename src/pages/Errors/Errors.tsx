import React from "react";
import {  useHistory } from "react-router-dom";
import { Result, Button } from "antd";

export default function Errors() {
  const goBack = useHistory().goBack;
  return (
    <div className="error404">
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que visitas no existe."
        extra={
          <Button type="primary" onClick={goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}
