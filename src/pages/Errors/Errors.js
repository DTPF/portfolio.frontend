import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

export default function Errors() {
  return (
    <div className="error404">
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que visitas no existe."
        extra={
          <Button type="primary">
            <Link to="/">Volver</Link>
          </Button>
        }
      />
    </div>
  );
}
