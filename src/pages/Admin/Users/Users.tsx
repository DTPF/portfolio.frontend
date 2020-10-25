import React, { useState, useEffect, Suspense, lazy } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
const Spin = lazy(() => import("../../../components/Spin"));
const ListUsers = lazy(() => import('../../../components/Admin/Users/ListUsers'));

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();
  let usersActiveLength = usersActive?.length ? usersActive?.length : 0;
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
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <ListUsers 
            usersActive={usersActive}
            usersInactive={usersInactive}
            setReloadUsers={setReloadUsers}
          />
        </Suspense>
      )}      
    </div>
  );
}
