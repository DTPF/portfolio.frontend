import React from "react";
import { Pagination as PaginationAntd } from "antd";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./Pagination.scss";

export default function Pagination(props: any) {
  const { courses, location, history, itemsPerPage, setItemsPerPage } = props;
  const currentPage = parseInt(courses.page);
  const pageSize = courses.totalDocs;  
  useScrollToTop(location);
  const onChangePage = (newPage: number) => {
    history.push(`${location.pathname}?page=${newPage}`);
  };
  const onShowSizeChange = (current: any, pageSize: any) => {
    setItemsPerPage(pageSize);
  }
  return (
    <PaginationAntd
      responsive
      defaultCurrent={currentPage}
      total={courses.totalDocs}
      pageSize={itemsPerPage}
      pageSizeOptions={["10", pageSize]}
      onShowSizeChange={onShowSizeChange}
      onChange={newPage => onChangePage(newPage)}
      className="pagination"
    />
  );
}
