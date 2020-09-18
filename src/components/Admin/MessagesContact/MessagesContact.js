import React, { useState } from "react";
import { Switch, List, Button, Modal as ModalDelete, notification } from "antd";
import Modal from "../../../components/Modal";
import { checkMessageApi, deleteContactMessageApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
import { notifDelay, notifDelayErr } from "../../../utils/notifications";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

import "./MessagesContact.scss";

const { confirm } = ModalDelete;

export default function MessagesContact(props) {
  const { messagesUnread, messagesRead, setReloadMessages } = props;
  const [viewMessagesUnread, setViewMessagesUnread] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle] = useState("");
  const [modalContent] = useState(null);
  return (
    <div className="messages-contact">
      <div className="messages-contact__header">
        <div className="messages-contact__switch">
          <Switch
            title="Mostrar Leídos"
            size="default"
            defaultChecked
            onChange={() => setViewMessagesUnread(!viewMessagesUnread)}
          />
          <span>{viewMessagesUnread ? "No leídos" : "Leídos"}</span>
        </div>
      </div>
      {viewMessagesUnread ? (
        <MessagesUnread
          messagesUnread={messagesUnread}
          setReloadMessages={setReloadMessages}
        />
      ) : (
        <MessagesRead
          messagesRead={messagesRead}
          setReloadMessages={setReloadMessages}
        />
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function MessagesUnread(props) {
  const { messagesUnread, setReloadMessages } = props;

  return (
    <List
      className="messages-unread"
      itemLayout="horizontal"
      dataSource={messagesUnread}
      renderItem={(message) => (
        <MessageUnread
          message={message}
          setReloadMessages={setReloadMessages}
        />
      )}
    />
  );
}

function MessageUnread(props) {
  const { message, setReloadMessages } = props;
  const checkMessage = () => {
    const accessToken = getAccessTokenApi();
    checkMessageApi(accessToken, message._id, true)
      .then((response) => {
        notification["success"]({
          message: response.message,
          duration: notifDelay,
        });
        setReloadMessages(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
          duration: notifDelayErr,
        });
      });
  };
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={checkMessage}>
          <CheckOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          `${message.name ? message.name + ' - ' : "Anónimo - "}` + message.date
        }
        description={message.subject + " - " + message.email}
      />
    </List.Item>
  );
}

function MessagesRead(props) {
  const { messagesRead, setReloadMessages } = props;

  return (
    <List
      className="messages-read"
      itemLayout="horizontal"
      dataSource={messagesRead}
      renderItem={(message) => (
        <MessageRead message={message} setReloadMessages={setReloadMessages} />
      )}
    />
  );
}

function MessageRead(props) {
  const { message, setReloadMessages } = props;
  const checkMessage = () => {
    const accessToken = getAccessTokenApi();
    checkMessageApi(accessToken, message._id, false)
      .then((response) => {
        notification["success"]({
          message: response.message,
          duration: notifDelay,
        });
        setReloadMessages(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
          duration: notifDelayErr,
        });
      });
  };
  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando mensaje",
      content: `¿Estás seguro que quieres eliminar el mensaje de ${message.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancaelText: "Cancelar",
      onOk() {
        deleteContactMessageApi(accessToken, message._id)
          .then(response => {
            if (response.status === 200) {
              notification["success"]({
                message: response.message,
                duration: notifDelay
              });
              setReloadMessages(true);
            } else {
              notification["warning"]({
                message: response.message,
                duration: notifDelayErr
              });
            }
          })
          .catch(err => {
            notification["error"]({
              message: err.message,
              duration: notifDelayErr
            });
          });
      }
    });
  }
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={checkMessage}>
          <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          `${message.name ? message.name + ' - ' : "Anónimo - "}` + message.date
        }
        description={message.subject + " - " + message.email}
      />
    </List.Item>
  );
}
