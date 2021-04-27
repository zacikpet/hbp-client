import React, { FC } from 'react'

type TablePaginationProps = {
  page: number
  pages: number
  onPreviousPage: () => void
  onNextPage: () => void
}

const TablePagination: FC<TablePaginationProps> = ({ page, pages, onNextPage, onPreviousPage }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPreviousPage}
        className="p-4 uppercase text-xs tracking-wider hover:text-blue-700 font-semibold"
      >
        Previous
      </button>
      <span>
        {page + 1} / {pages}
      </span>
      <button onClick={onNextPage} className="p-4 uppercase text-xs tracking-wider hover:text-blue-700 font-semibold">
        Next
      </button>
    </div>
  )
}

export default TablePagination
