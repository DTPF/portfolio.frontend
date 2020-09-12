import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  console.log(listItems);

  useEffect(() => {
    const listItemsArray = [];
    menu.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem item={item} />
        ),
      });
    });
    setListItems(listItemsArray);
  }, [menu]);

  const onSort = (sortedList, dropEvent) => {
    console.log(sortedList);
  };
  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary">Añadir Menú</Button>
      </div>
      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>
    </div>
  );
}

function MenuItem(props) {
  const { item } = props;

  return (
    <List.Item
      actions={[
        <Switch defaultChecked={item.active} />,
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
