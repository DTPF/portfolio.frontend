import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import Pagination from "../../../components/Pagination";
import { getCoursesApi } from "../../../api/education";
import CoursesList from "../../../components/Admin/Courses/CoursesList";
import AddEditCoursesForm from "../../../components/Admin/Courses/AddEditCoursesForm";
import { LoadingOutlined } from "@ant-design/icons";

import "./Courses.scss";

function Courses(props) {
  const { location, history } = props;
  const [courses, setCourses] = useState(null);
  const [reloadCourses, setReloadCourses] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    let unmounted = false;
    getCoursesApi(10, page).then((response) => {
      if (!unmounted) {
        setCourses(response.courses);
      }
    });
    window.scrollTo(0, 0);
    setReloadCourses(false);
    return () => {unmounted = true};
  }, [page, reloadCourses]);

  const addCourse = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva Formación");
    setModalContent(
      <AddEditCoursesForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={null}
      />
    );
  };

  const editCourse = (course) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Curso");
    setModalContent(
      <AddEditCoursesForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  return (
    <div className="admin-courses">
      <div className="admin-courses__add-course">
        <Button type="primary" onClick={addCourse}>
          Nuevo post
        </Button>
      </div>
      <CoursesList
        courses={courses}
        setReloadCourses={setReloadCourses}
        editCourse={editCourse}
      />
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
        <>
          {courses.totalPages > 1 && (
            <Pagination
              courses={courses}
              location={location}
              history={history}
            />
          )}
        </>
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Courses);
