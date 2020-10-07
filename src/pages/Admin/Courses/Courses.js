import React, { useState, useEffect, Suspense, lazy } from "react";
import { Button, Spin } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getCoursesApi } from "../../../api/education";
import { LoadingOutlined } from "@ant-design/icons";
import "./Courses.scss";
const Modal = lazy(() => import('../../../components/Modal'));
const Pagination = lazy(() => import('../../../components/Pagination'));
const CoursesList = lazy(() => import('../../../components/Admin/Courses/CoursesList'));
const AddEditCoursesForm = lazy(() => import('../../../components/Admin/Courses/AddEditCoursesForm'));

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
      <Suspense fallback={<></>}>
        <AddEditCoursesForm
          setIsVisibleModal={setIsVisibleModal}
          setReloadCourses={setReloadCourses}
          course={null}
        />
      </Suspense>
    );
  };
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
    <div className="admin-courses">
      <div className="admin-courses__add-course">
        <Button type="primary" onClick={addCourse}>
          Nueva Formación
        </Button>
      </div>
      <Suspense fallback={<></>}>
        <CoursesList
          courses={courses}
          setReloadCourses={setReloadCourses}
          editCourse={editCourse}
        />
      </Suspense>
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
          <Suspense fallback={<></>}>
            {courses.totalPages > 1 && (
              <Pagination
                courses={courses}
                location={location}
                history={history}
              />
            )}
          </Suspense>
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

export default withRouter(Courses);
