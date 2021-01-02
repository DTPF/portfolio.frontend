import { useState, useEffect } from "react";
import useGetMainMenu from "../../hooks/useGetMainMenu";
import useGetMainMenuDBIndexed from "./useGetMainMenuDBIndexed";
import useConnection from "../../hooks/useConnection";

export default function GetMainMenu() {
  const { connectionStatus, isNavigatorOnline } = useConnection();
  const { mainMenu } = useGetMainMenu();
  const { mainMenuIndexed } = useGetMainMenuDBIndexed();
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    connectionStatus === 500 || !isNavigatorOnline
      ? setMenu(mainMenuIndexed)
      : setMenu(mainMenu);
  }, [connectionStatus, isNavigatorOnline, mainMenuIndexed, mainMenu]);
  return menu;
}
