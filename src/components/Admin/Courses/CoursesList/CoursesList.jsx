import React from "react";
import Moment from "react-moment";
import "moment/locale/es";
import { List, Button, Spin, Modal, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { Link } from "react-router-dom";
import { deleteCourseApi } from "../../../../api/education";
import {
  LoadingOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

export default function CoursesList(props) {
  const { courses, setReloadCourses, editCourse } = props;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const deleteCourse = (course) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando curso",
      content: `¿Estas seguro de eliminar el curso ${course.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accessToken, course._id)
          .then((response) => {
            const typeNotification =
              response.status === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadCourses(true);
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
    <div className="courses-list">
      {!courses ? (
        <Spin
          indicator={antIcon}
          style={{
            textAlign: "center",
            width: "100%",
            height: "100%",
            padding: "20px",
            marginTop: "200px",
            color: "#5d718d",
          }}
        />
      ) : (
        <List
          dataSource={courses.docs}
          renderItem={(course) => (
            <Course
              course={course}
              deleteCourse={deleteCourse}
              editCourse={editCourse}
            />
          )}
        />
      )}
    </div>
  );
}

function Course(props) {
  const { course, deleteCourse, editCourse } = props;
  const date = (
    <>      
      Hace&nbsp;
      <Moment locale="es" fromNow ago>
        {course.date}
      </Moment>
    </>
  );
  return (
    <List.Item
      actions={[
        <Link to={`/education/${course.url}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,
        <Button type="primary" onClick={() => editCourse(course)}>
          <EditOutlined />
        </Button>,
        <Button type="primary" danger onClick={() => deleteCourse(course)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={course.title} description={date} />
    </List.Item>
  );
}
