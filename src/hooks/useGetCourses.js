import { useState, useEffect } from "react";
import { getCoursesApi } from "../api/education";
import queryString from "query-string";

export function useGetCourses(num, location) {
  const { page = 1 } = queryString.parse(location.search);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getCoursesApi(num, page).then((response) => {
      isMounted && setCourses(response.courses);
    });
    return () => { isMounted = false };
  }, [num, page]);
  return [courses];
}
