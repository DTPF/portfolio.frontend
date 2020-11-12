import React from "react";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { Button } from "antd";

export default function Home({userData}: any) {
  const { name, lastname } = userData.user;
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const deleteCookies = () => {
    const getCookies = document.cookie.split(";");
    if (getCookies.length > 1) {
      for (let i = 0; i < getCookies.length; i++) {
        removeCookie(getCookies[i]);
      }
    }
    history.go(0);
  };
  let titulo;
  if (userData) {
    titulo = (
      <h1>
        Hola
        {name ? " " + name : " Anónimo"}
        {lastname ? " " + lastname : ""}
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
