import React, { Suspense, lazy } from "react";
import "moment/locale/es";
import { List, Button, Modal, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { Link } from "react-router-dom";
import { deleteCourseApi } from "../../../../api/education";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const Spin = lazy(() => import("../../../../components/Spin"));
const Moment = lazy(() => import("react-moment"));
const { confirm } = Modal;

export default function CoursesList(props: any) {
  const { courses, setReloadCourses, editCourse } = props;
  const deleteCourse = (course: any) => {
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
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
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

function Course(props: any) {
  const { course, deleteCourse, editCourse } = props;
  const date = (
    <Suspense fallback={<></>}>  
      Hace&nbsp;
      <Moment locale="es" fromNow ago>
        {course.date}
      </Moment>
    </Suspense>
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
