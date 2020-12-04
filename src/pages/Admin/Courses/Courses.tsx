import React, { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getCoursesApi } from "../../../api/education";
import "./Courses.scss";
const Modal = lazy(() => import("../../../components/UI/Modal"));
const PaginationAnt = lazy(() => import("../../../components/UI/Pagination"));
const CoursesList = lazy(
  () => import("../../../components/Admin/Courses/CoursesList")
);
const AddEditCoursesForm = lazy(
  () => import("../../../components/Admin/Courses/AddEditCoursesForm")
);
const Helmet = lazy(
  () => import("../../../components/Helmet")
);

function Courses(props: any) {
  const { location, history } = props;
  const [courses, setCourses] = useState(null);
  const [reloadCourses, setReloadCourses] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  useEffect(() => {
    let unmounted = false;
    getCoursesApi(10, page).then((response) => {
      if (!unmounted) {
        setCourses(response.courses);
      }
    });
    setReloadCourses(false);
    return () => { unmounted = true };
  }, [page, reloadCourses]);
  return (
    <div className="admin-courses">
      <Suspense fallback={<></>}>
        <Helmet
          titleHelmet="DTPF | Admin Cursos"
          contentHelmet="Página Admin de Cursos"
        />
      </Suspense>
      <AddCourse
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCourses={setReloadCourses}
      />
      <RenderListCourses
        courses={courses}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadCourses={setReloadCourses}
      />
      {courses && (
        <Pagination courses={courses} location={location} history={history} />
      )}
      <Suspense fallback={<></>}>
        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          className={null}
        >
          {modalContent}
        </Modal>
      </Suspense>
    </div>
  );
}

function AddCourse(props: any) {
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

function RenderListCourses(props: any) {
  const {
    courses,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadCourses,
  } = props;
  const editCourse = (course: any) => {
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
    <CoursesList
      courses={courses}
      setReloadCourses={setReloadCourses}
      editCourse={editCourse}
    />
  );
}

function Pagination(props: any) {
  const { courses, location, history } = props;
  return (
    <>
      {courses.totalPages > 1 && (
        <PaginationAnt
          courses={courses}
          location={location}
          history={history}
        />
      )}
    </>
  );
}

export default withRouter(Courses);
