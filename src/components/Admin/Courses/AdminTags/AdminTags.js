import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getCourseApi,
  addTagApi,
  deleteTagApi,
} from "../../../../api/education";
import {
  Button,
  Row,
  Col,
  Form,
  Divider,
  Input,
  Tag,
  Modal,
  Spin,
  notification,
} from "antd";
import { notifDelay, notifDelayErr } from "../../../../utils/notifications";
import {
  LoadingOutlined,
  TagOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./AdminTags.scss";
const { confirm } = Modal;

export default function AdminTags(props) {
  const { courseData } = props;
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [reloadTags, setReloadTags] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    let unmounted = false;
    const url = courseData.url;
    if (!unmounted) {
      if (url !== undefined) {
        getCourseApi(url).then((response) => {        
          setTags(response.course.tags);          
        });
      }
    }
    setReloadTags(false);
    return () => {
      unmounted = true;
    };
  }, [ courseData, reloadTags, tag]);
  const addTag = () => {
    const token = getAccessTokenApi();
    addTagApi(token, courseData._id, tag)
      .then((response) => {
        if (response.status === 200) {
          notification["success"]({
            message: `"${tag.tags}" añadido correctamente.`,
            duration: notifDelay,
          });
          setReloadTags(true);
          setTag([]);
        } else {
          notification["warning"]({
            message: response.message,
            duration: notifDelayErr,
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };
  const deleteTag = (tag) => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminando curso",
      content: `¿Estas seguro de eliminar el curso ${tag}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTagApi(token, courseData._id, { tags: [tag] })
          .then((response) => {
            if (response.status === 200) {
              notification["success"]({
                message: `"${tag}" eliminado correctamente.`,
                duration: notifDelay,
              });
              setReloadTags(true);
            } else {
              notification["warnig"]({
                message: response.message,
                duration: notifDelay,
              });
            }
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      },
    });
  };
  return (
    <div>
      {!courseData ? (
        <Spin
          indicator={antIcon}
          style={{
            textAlign: "center",
            width: "100%",
            height: "100vh",
            padding: "20px",
            paddingTop: "200px",
            color: "#E4E4E4",
            backgroundColor: "#E4E4E4",
          }}
        />
      ) : (
        <div className="admin-tags">
          <Divider className="tag-divider">Tags</Divider>
          <Row className="admin-tags__tags">
            {tags.map((tag) => (
              <Col key={tag} className={tag}>
                <TagAnt
                  tag={tag}
                  courseData={courseData}
                  setReloadTags={setReloadTags}
                  deleteTag={deleteTag}
                />
              </Col>
            ))}
          </Row>
          <div className="admin-tags__add-tag">
            <AddTagForm tag={tag} addTag={addTag} setTag={setTag} />
          </div>
        </div>
      )}
    </div>
  );
}

function TagAnt(props) {
  const { tag, deleteTag } = props;
  return (
    <Tag tag={tag} onClick={() => deleteTag(tag)}>
      {tag}
    </Tag>
  );
}

function AddTagForm(props) {
  const { tag, addTag, setTag } = props;
  return (
    <div className="admin-tags__add-tag-form">
      <Form layout="inline" onFinish={addTag}>
        <Input.Group>
          <Input
            prefix={<TagOutlined />}
            placeholder="Añadir Tag"
            value={tag && tag.tags}
            onChange={(e) => setTag({ ...tag, tags: e.target.value })}
          />
          <Button type="primary" htmlType="submit" className="btn-submit">
            <PlusCircleOutlined />
          </Button>
        </Input.Group>
      </Form>
    </div>
  );
}
