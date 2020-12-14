import React, { useState, useEffect } from "react";
import { checkUserLogin } from "../../../providers/AuthProvider";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { Button } from "antd";

export default function Home(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  const deleteCookies = () => {
    const getCookies = document.cookie.split(";");
    if (getCookies.length > 1) {
      for (let i = 0; i < getCookies.length; i++) {
        removeCookie(getCookies[i]);
      }
    }
    history.go(0);
  };
  const [user, setUser] = useState(null);  
  useEffect(() => {
    let isMounted = true;
    isMounted && checkUserLogin(setUser);
    return () => { isMounted = false }
  }, []);
  return (
    <RenderHome userData={user} deleteCookies={deleteCookies} />
  );
}

function RenderHome(props: any) {
  const { deleteCookies, userData } = props;
  return (
    <>
      <h1>
        Hola {userData ? userData.user.name : "Anónimo"}{" "}
        {userData && userData.user.lastname}
      </h1>
      <Button type="primary" onClick={deleteCookies}>
        Borrar Cookies
      </Button>
    </>
  );
}
