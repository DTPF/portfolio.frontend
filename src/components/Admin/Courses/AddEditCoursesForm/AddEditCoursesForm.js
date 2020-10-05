import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  notification,
} from "antd";
import AdminTags from "../../../../components/Admin/Courses/AdminTags";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/education";
import { LinkOutlined, FontSizeOutlined } from "@ant-design/icons";
import moment from "moment";
import "./AddEditCoursesForm.scss";

const { TextArea } = Input;

export default function AddEditCoursesForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData([]);
    }
  }, [course]);

  const processCourse = () => {
    const { title, url, description, duration } = courseData;
    if (!title || !url || !description || !duration) {
      notification["error"]({
        message:
          "Los campos de título, url, descripción y duración son obligatorios.",
      });
    } else {
      if (!course) {
        addCourse();
      } else {
        updateCourse();
      }
    }
  };

  const addCourse = () => {
    const token = getAccessTokenApi();
    addCourseApi(token, courseData)
      .then((response) => {
        if (response.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          notification["success"]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData([]);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  const updateCourse = () => {
    const token = getAccessTokenApi();
    updateCourseApi(token, course._id, courseData)
      .then((response) => {
        const typeNotification =
          response.status === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData([]);
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  return (
    <div className="add-edit-course">
      <AddEditForm
        courseData={courseData}
        setCourseData={setCourseData}
        course={course}
        processCourse={processCourse}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { courseData, setCourseData, course, processCourse } = props;

  return (
    <>
      <Form
        className="add-edit-course-form"
        layout="inline"
        onFinish={processCourse}
      >
        <Row className="add-edit-course-form-course">
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<FontSizeOutlined />}
                placeholder="Titulo"
                value={courseData.title}
                onChange={(e) => {
                  setCourseData({
                    ...courseData,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<LinkOutlined />}
                placeholder="URL"
                value={courseData.url}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    url: transformTextToUrl(e.target.value),
                  })
                }
              />
            </Form.Item>
          </Col>

          <Input.Group>
            <DatePicker
              style={{ width: "70%" }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder="Fecha de publicación"
              value={courseData.date && moment(courseData.date)}
              onChange={(e, value) =>
                setCourseData({
                  ...courseData,
                  date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
                })
              }
            />
            <InputNumber
              style={{ width: "30%" }}
              placeholder="Duración"
              value={courseData.duration}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  duration: e,
                })
              }
            />
          </Input.Group>

          <Col span={24}>
            <TextArea
              rows={5}
              placeholder="Descripción"
              value={courseData.description ? courseData.description : ""}
              onChange={(e) =>
                setCourseData({ ...courseData, description: e.target.value })
              }
            ></TextArea>
          </Col>
          <Col span={24}>
            <Input
              prefix={<LinkOutlined />}
              placeholder="Link"
              value={courseData.link}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  link: e.target.value,
                })
              }
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Actualizar curso" : "Crear curso"}
        </Button>
      </Form>
      {course && <AdminTags courseData={courseData} />}
    </>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
