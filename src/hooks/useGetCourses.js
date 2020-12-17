import { useState, useEffect } from "react";
import { getCoursesApi } from "../api/education";
import queryString from "query-string";
import { useDBConnectionStatus, useIsNavigatorOnline } from "../hooks/useConnection";

export function useGetCourses(itemsPerPage, location = 1) {
  const { page = 1 } = queryString.parse(location.search);
  const [courses, setCourses] = useState([]);
  const isNavigatorOnline = useIsNavigatorOnline();
  const connectionStatus = useDBConnectionStatus();
  useEffect(() => {
    let isMounted = true;
    getCoursesApi(itemsPerPage, page).then((response) => {
      isMounted && setCourses(response.courses);
    });
    return () => { isMounted = false };
  }, [itemsPerPage, page, isNavigatorOnline, connectionStatus]);
  return courses;
}
