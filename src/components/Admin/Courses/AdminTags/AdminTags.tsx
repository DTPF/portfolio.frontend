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

export default function AdminTags(props: {
  course: { url: string };
  courseData: { _id: string };
  setReloadCourses: any;
}) {
  const { course, courseData, setReloadCourses } = props;
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [reloadTags, setReloadTags] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let tagType: any = tag;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getCourseApi(course.url).then((response) => {
        setTags(response.course.tags);
      });
    }
    setReloadTags(false);
    return () => {
      unmounted = true;
    };
  }, [course, reloadTags, tag]);
  const deleteTag = (tag: string) => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminando tag",
      content: `¿Estas seguro de eliminar el tag ${tag}?`,
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
              setReloadCourses(true);
              setReloadTags(true);
            } else {
              notification["warning"]({
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
                <TagAnt tag={tag} deleteTag={deleteTag} />
              </Col>
            ))}
          </Row>
          <div className="admin-tags__add-tag">
            <AddTagForm
              tag={tagType}
              course={course}
              setTag={setTag}
              setReloadCourses={setReloadCourses}
              setReloadTags={setReloadTags}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TagAnt(props: any) {
  const { tag, deleteTag } = props;
  return <Tag onClick={() => deleteTag(tag)}>{tag}</Tag>;
}

function AddTagForm(props: any) {
  const { tag, setTag, course, setReloadCourses, setReloadTags } = props;
  const addTag = () => {
    const token = getAccessTokenApi();
    addTagApi(token, course._id, tag)
      .then((response) => {
        if (response.status === 200) {
          notification["success"]({
            message: `"${tag.tags}" añadido correctamente.`,
            duration: notifDelay,
          });
          setReloadCourses(true);
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
