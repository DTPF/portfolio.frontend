import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification, message } from "antd";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import { updateMenuApi, activateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import { notifDelay, notifDelayErr } from "../../../../config/notifications";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddMenuWebForm from "../AddMenuWebForm";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];
    menu.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem item={item} activateMenu={activateMenu} />
        )
      });
    });
    setListItems(listItemsArray);
  }, [menu]);

  const activateMenu = (menu, status) => {
    const accessToken = getAccessTokenApi();
    
    activateMenuApi(accessToken, menu._id, status)
    .then(response => {
        if(status === true) {
          notification["success"]({
            message: response.message,
            duration: notifDelay
          });
        } else {
          notification["warning"]({
            message: response.message,
            duration: notifDelayErr
          });
        }
      });
  };

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(accessToken, _id, { order });
    });
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo menú");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  }

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>Crear Menú</Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function MenuItem(props) {
  const { item, activateMenu } = props;

  return (
    <List.Item
      actions={[
        <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
        <Button type="primary">
          <EditOutlined />
        </Button>,
        <Button type="danger">
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
