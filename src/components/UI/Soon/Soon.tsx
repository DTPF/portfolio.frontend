import React from "react";
import { useHistory } from "react-router";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./Soon.scss";

export default function Soon() {
  const history = useHistory();
  const goBack = history.goBack;
  return (
    <div className="result-ant">
      <Result
        icon={<SmileOutlined />}
        title="Próximamente!"
        extra={
          <Button type="primary" onClick={goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}
