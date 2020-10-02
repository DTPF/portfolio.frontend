import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

export default function Pagination(props) {
  const { courses, location, history } = props;
  const currentPage = parseInt(courses.page);  

  const onChangePage = newPage => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      responsive
      defaultCurrent={currentPage}
      total={courses.total}
      pageSize={courses.limit}
      onChange={newPage => onChangePage(newPage)}
      className="pagination"
    />
  );
}
