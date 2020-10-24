import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  Image,
  DatePicker,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import AdminTags from "../AdminTags";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  addCourseApi,
  updateCourseApi,
  getImageApi,
  uploadImageApi,
} from "../../../../api/education";
import { LinkOutlined, FontSizeOutlined } from "@ant-design/icons";
import moment from "moment";
import { notifDelay, notifDelayErr } from "../../../../utils/notifications";
import NoImage from "../../../../assets/img/png/no-image.png";
import "./AddEditCoursesForm.scss";
const { TextArea } = Input;

export default function AddEditCoursesForm(props: any) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [image, setImage] = useState(null);
  const [courseData, setCourseData] = useState([]);  
  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData([]);
    }
  }, [course]);
  useEffect(() => {
    if (course && course.image) {
      getImageApi(course.image).then((response) => {
        setImage(response.url);
      });
    } else {
      setImage(null);
    }
  }, [course]);
  return (
    <div className="add-edit-course">
      {course && <UploadImage image={image} setImage={setImage} />}
      <AddEditForm
        courseData={courseData}
        setCourseData={setCourseData}
        course={course}
        setReloadCourses={setReloadCourses}
        image={image}
        setIsVisibleModal={setIsVisibleModal}
      />
    </div>
  );
}

function AddEditForm(props: any) {
  const {
    courseData,
    setCourseData,
    course,
    setReloadCourses,
    image,
    setIsVisibleModal,
  } = props;
  const [proccessCourseState, setProccessCourseState] = useState(false);
  const token = getAccessTokenApi();
  useEffect(() => {
    if (image) {
      setCourseData({ ...courseData, image: image.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const processCourse = () => {
    const { title, url, description, duration } = courseData;
    if (!title || !url || !description || !duration) {
      notification["warning"]({
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
  const updateCourse = () => {
    let userUpdate = courseData;
    if (typeof userUpdate.image === "object") {
      uploadImageApi(token, userUpdate.image, course._id).then((response) => {
        if (response.status === 200) {
          userUpdate.image = response.image;
          updateCourseApi(token, course._id, userUpdate).then((result) => {
            if (result.status === 200) {
              notification["success"]({
                message: result.message,
                duration: notifDelay,
              });
              setIsVisibleModal(false);
              setReloadCourses(true);
            } else {
              notification["error"]({
                message: result.message,
                duration: notifDelayErr,
              });
              setReloadCourses(true);
            }
          });
        } else {
          notification["error"]({
            message: response.message,
            duration: notifDelay,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
        }
      });
    } else {
      updateCourseApi(token, course._id, courseData)
        .then((response) => {
          if (response.status === 200) {
            notification["success"]({
              message: response.message,
            });
            setIsVisibleModal(false);
            setReloadCourses(true);
            setCourseData([]);
          } else {
            const typeNotification =
              response.status === 500 ? "error" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
          }
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor.",
          });
        });
    }
  };
  const addCourse = () => {
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
  const loading = () => {
    setProccessCourseState(true);
  };
  setTimeout(() => {
    setProccessCourseState(false);
  }, 6000);
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
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<LinkOutlined />}
                placeholder="Plataforma"
                value={courseData.platform}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    platform: e.target.value,
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
        <Button
          type="primary"
          htmlType="submit"
          loading={proccessCourseState}
          onClick={loading}
          className="btn-submit"
        >
          {course ? "Actualizar curso" : "Crear curso"}
        </Button>
      </Form>
      {course && (
        <AdminTags
          course={course}
          courseData={courseData}
          setReloadCourses={setReloadCourses}
        />
      )}
    </>
  );
}

function UploadImage(props: any) {
  const { image, setImage } = props;
  const [imageUrl, setImageUrl] = useState("");
  let imageType: string = imageUrl;  
  useEffect(() => {
    if (image) {
      if (image.preview) {
        setImageUrl(image.preview);
      } else {
        setImageUrl(image);
      }
    } else {
      setImageUrl("");
    }
  }, [image]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file === undefined) {
        notification["error"]({
          message: "Formato de imágen inválido.",
          duration: notifDelay,
        });
      } else {
        setImage({ file, preview: URL.createObjectURL(file) });
      }
    },
    [setImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className="upload-image" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoImage} preview={false} />
      ) : (
        <Image src={imageType ? imageType : NoImage} preview={false} />
      )}
      <span>Tamaño de imágen: 750px x 422px</span>
    </div>
  );
}

function transformTextToUrl(text: string) {
  const u1 = text.replace(/ /g, "-");
  const u2 = u1.replace(/,/g, "");
  const u3 = u2.replace(/á/g, "a");
  const u4 = u3.replace(/é/g, "e");
  const u5 = u4.replace(/í/g, "i");
  const u6 = u5.replace(/ó/g, "o");
  const u7 = u6.replace(/ú/g, "u");
  const u8 = u7.replace(/Á/g, "A");
  const u9 = u8.replace(/É/g, "E");
  const u10 = u9.replace(/Í/g, "I");
  const u11 = u10.replace(/Ó/g, "O");
  const u12 = u11.replace(/Ú/g, "U");
  const url = u12.replace(/:/g, "");
  return url.toLowerCase();
}
