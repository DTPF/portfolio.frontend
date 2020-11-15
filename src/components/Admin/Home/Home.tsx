import React from "react";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { Button } from "antd";

export default function Home({ userData }: any) {
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
  return (
    <RenderHome userData={userData} deleteCookies={deleteCookies} />
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
