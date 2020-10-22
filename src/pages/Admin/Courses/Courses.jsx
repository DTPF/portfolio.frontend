import React, { useState, useEffect, Suspense, lazy } from "react";
import { Button, Spin } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getCoursesApi } from "../../../api/education";
import { LoadingOutlined } from "@ant-design/icons";
import "./Courses.scss";
import AddEditCoursesForm from "../../../components/Admin/Courses/AddEditCoursesForm";
const Modal = lazy(() => import("../../../components/Modal"));
const PaginationAnt = lazy(() => import("../../../components/Pagination"));
const CoursesList = lazy(() => import("../../../components/Admin/Courses/CoursesList"));

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
    return () => { unmounted = true };
  }, [page, reloadCourses]);

  return (
    <div className="admin-courses">
      <AddCourse
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCourses={setReloadCourses}
      />
      <EditCourse
        courses={courses}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCourses={setReloadCourses}
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
          <Pagination
            courses={courses}
            location={location}
            history={history}
          />
        </>
      )}
      <Suspense fallback={<></>}>
        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          width="75%"
        >
          {modalContent}
        </Modal>
      </Suspense>
    </div>
  );
}

function AddCourse(props) {
  const {
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadCourses,
  } = props;
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
  return (
    <div className="admin-courses__add-course">
      <Button type="primary" onClick={addCourse}>
        Nueva Formación
      </Button>
    </div>
  );
}

function EditCourse(props) {
  const {
    courses,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadCourses,
  } = props;
  const editCourse = (course) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Curso");
    setModalContent(
      <Suspense fallback={<></>}>
        <AddEditCoursesForm
          setIsVisibleModal={setIsVisibleModal}
          setReloadCourses={setReloadCourses}
          course={course}
        />
      </Suspense>
    );
  };
  return (
    <Suspense fallback={<></>}>
      <CoursesList
        courses={courses}
        setReloadCourses={setReloadCourses}
        editCourse={editCourse}
      />
    </Suspense>
  );
}

function Pagination(props) {
  const { courses, location, history } = props;
  return (
    <Suspense fallback={<></>}>
      {courses.totalPages > 1 && (
        <PaginationAnt courses={courses} location={location} history={history} />
      )}
    </Suspense>
  );
}

export default withRouter(Courses);
