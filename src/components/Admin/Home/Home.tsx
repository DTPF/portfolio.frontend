import React from "react";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { Button } from "antd";

export default function Home(props: any) {
  const { userData } = props;
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const deleteCookies = () => {
    var cookiesA = document.cookie.split(";");
    if (cookiesA.length > 1) {
      console.log(cookiesA.length);
      for (let i = 0; i < cookiesA.length; i++) {
        removeCookie(cookiesA[i]);
      }
    }
    history.go(0);
  };
  let titulo;
  if (userData) {
    titulo = (
      <h1>
        Hola
        {userData.user.name ? " " + userData.user.name : " Anónimo"}
        {userData.user.lastname ? " " + userData.user.lastname : ""}
      </h1>
    );
  }
  return (
    <>
      {titulo}
      <Button type="primary" onClick={deleteCookies}>
        Borrar Cookies
      </Button>
    </>
  );
}
