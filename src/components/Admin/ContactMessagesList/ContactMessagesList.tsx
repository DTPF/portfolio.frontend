import React, { useState, Suspense, lazy } from "react";
import {
  Switch,
  List,
  Button,
  Modal as ModalDelete,
  message as messageAnt,
} from "antd";
import Modal from "../../UI/Modal";
import { checkMessageApi, deleteContactMessageApi } from "../../../api/contact";
import { getAccessTokenApi } from "../../../api/auth";
import { reloadMessagesTrueApi } from "../../../api/utils";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ContactMessagesList.scss";
import "moment/locale/es";
const Moment = lazy(() => import("react-moment"));
const { confirm } = ModalDelete;

export default function ContactMessagesList(props: any) {
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

function MessagesUnread(props: any) {
  const { messagesUnread, setReloadMessages } = props;
  return (
    <List
      className="messages-unread"
      itemLayout="horizontal"
      dataSource={messagesUnread}
      renderItem={(message: any) => (
        <MessageUnread
          message={message}
          setReloadMessages={setReloadMessages}
        />
      )}
    />
  );
}

function MessageUnread(props: any) {
  const { message, setReloadMessages } = props;
  const checkMessage = () => {
    const accessToken = getAccessTokenApi();
    reloadMessagesTrueApi().then(() => {
      checkMessageApi(accessToken, message._id, true)
        .then((response) => {
          messageAnt.success(response.message);
          setReloadMessages(true);
        })
        .catch((err) => {
          messageAnt.error(err.message);
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
          <span>
            {message.name ? message.name + " - Hace " : "Anónimo - Hace "}
            <Suspense fallback={<></>}>
              <Moment locale="es" fromNow ago>
                {message.date}
              </Moment>
            </Suspense>
          </span>
        }
        description={
          <div>
            <em>{message.email}</em>
            <div>{message.phone_number}</div>
            {message.subject !== "Sin asunto" && message.subject && (
              <div>Asunto: {message.subject}</div>
            )}
            <p>{message.message}</p>
          </div>
        }
      />
    </List.Item>
  );
}

function MessagesRead(props: any) {
  const { messagesRead, setReloadMessages } = props;
  return (
    <List
      className="messages-read"
      itemLayout="horizontal"
      dataSource={messagesRead}
      renderItem={(message: any) => (
        <MessageRead message={message} setReloadMessages={setReloadMessages} />
      )}
    />
  );
}

function MessageRead(props: any) {
  const { message, setReloadMessages } = props;
  const checkMessage = () => {
    const accessToken = getAccessTokenApi();
    checkMessageApi(accessToken, message._id, false)
      .then((response) => {
        messageAnt.success(response.message);
        setReloadMessages(true);
      })
      .catch((err) => {
        messageAnt.error(err.message);
      });
  };
  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando mensaje",
      content: `¿Estás seguro que quieres eliminar el mensaje de ${message.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteContactMessageApi(accessToken, message._id)
          .then((response) => {
            if (response.status === 200) {
              messageAnt.success(response.message);
            } else {
              messageAnt.warning(response.message);
            }
            setReloadMessages(true);
          })
          .catch((err) => {
            messageAnt.error(err.message);
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={checkMessage}>
          <CheckOutlined />
        </Button>,
        <Button type="primary" danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          <span>
            {message.name ? message.name + " - Hace " : "Anónimo - Hace "}
            <Suspense fallback={<></>}>
              <Moment locale="es" fromNow ago>
                {message.date}
              </Moment>
            </Suspense>
          </span>
        }
        description={
          <div>
            <em>{message.email}</em>
            <div>{message.phone_number}</div>
            {message.subject !== "Sin asunto" && message!.subject && (
              <div>Asunto: {message.subject}</div>
            )}
            <p>{message.message}</p>
          </div>
        }
      />
    </List.Item>
  );
}
