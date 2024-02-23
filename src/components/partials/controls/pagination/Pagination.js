import React from "react"
import PaginationLinks from "./PaginationLinks"
import PaginationToolbar from "./PaginationToolbar"

const Pagination = (props) => {
  const { children, isLoading, paginationProps ,showPagToolbar } = props
  return (
    <>
      {children}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <PaginationLinks paginationProps={paginationProps} />
        { showPagToolbar &&
        <PaginationToolbar
          isLoading={isLoading}
          paginationProps={paginationProps}
        />
}
      </div>
    </>
  )
}


export default Pagination
