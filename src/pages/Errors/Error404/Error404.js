import React from "react";
import { Link } from 'react-router-dom';
import { Result, Button } from "antd";

import './Error404.scss';

export default function Error404(props) {
  return (
    <div className="error404">
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que visitas no existe."
        extra={
          <Button type="primary">
            <Link to="/">
              Volver
            </Link>
          </Button>
        }
      />
    </div>
  );
}
