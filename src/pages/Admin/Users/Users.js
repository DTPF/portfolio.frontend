import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import { Spin } from "antd";
import ListUsers from "../../../components/Admin/Users/ListUsers";

import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();
  let usersActiveLength = usersActive.length ? usersActive.length : 0;

  useEffect(() => {
    let unmounted = false;    
    getUsersActiveApi(token, true).then((response) => {
      if (!unmounted) {
        setUsersActive(response.users);
      }
    });
    getUsersActiveApi(token, false).then((response) => {
      if (!unmounted) {
        setUsersInactive(response.users);
      }
    });
    setReloadUsers(false);

    return () => { unmounted = true };
  }, [reloadUsers, token]);

  return (
    <div className="users">
      {usersActiveLength === 0 ? (
        <Spin
          tipe="Cargando usuarios"
          style={{
            textAlign: "center",
            width: "100%",
            padding: "20px",
            marginTop: "200px"
          }}
        />
      ) : (
        <ListUsers 
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
      )}      
    </div>
  );
}
