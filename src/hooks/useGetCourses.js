import { useState, useEffect } from "react";
import { getCoursesApi } from "../api/education";
import queryString from "query-string";

export function useGetCourses(num, location) {
  const { page = 1 } = queryString.parse(location.search);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    let unmounted = false;
    getCoursesApi(num, page).then((response) => {
      if (!unmounted) {
        setCourses(response.courses);
      }
    });
    return () => { unmounted = true };
  }, [num, page]);
  return [courses];
}
