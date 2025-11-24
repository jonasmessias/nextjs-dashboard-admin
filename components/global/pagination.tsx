import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadPagination,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { Table } from '@tanstack/react-table'
import React, { Dispatch, SetStateAction } from 'react'
import { SelectTableView } from './select-table-view'
import { Text } from './text'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  className?: string
}

export function DataTablePagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex
  const totalRows = table.getFilteredRowModel().rows.length
  const pageSize = table.getState().pagination.pageSize

  const pageSizeOptions = [
    { value: '2', label: '2' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '100', label: '100' },
  ]

  const getPagesToShow = () => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i)
    }
    if (currentPage < 4) {
      return [0, 1, 2, 3, pageCount - 1]
    }
    if (currentPage > pageCount - 4) {
      return [0, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1]
    }
    return [0, currentPage - 1, currentPage, currentPage + 1, pageCount - 1]
  }

  const pagesToShow = getPagesToShow()

  const isActive = (index: number): boolean =>
    table.getState().pagination.pageIndex === index

  return (
    <div className={cn('flex items-center justify-between w-full', className)}>
      {/* Total Results */}
      <div className="flex items-center">
        <Text size="sm" weight="regular" className="text-black-100">
          {totalRows} {totalRows === 1 ? 'Resultado' : 'Resultados'}
        </Text>
      </div>

      {/* Pagination */}
      <ShadPagination className={cn(pageCount === 1 && 'hidden', 'w-fit')}>
        <PaginationContent>
          <PaginationItem
            className="hover:cursor-pointer"
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }>
            <PaginationPrevious className="rounded-full" />
          </PaginationItem>
          {pagesToShow.map((page, index) => (
            <React.Fragment key={page}>
              {index > 0 && pagesToShow[index - 1] + 1 < page && (
                <PaginationItem className="pointer-events-none">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem onClick={() => table.setPageIndex(page)}>
                <PaginationLink isActive={isActive(page)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            </React.Fragment>
          ))}
          <PaginationItem
            onClick={() => {
              if (
                table.getPageCount() >
                table.getState().pagination.pageIndex + 1
              ) {
                table.setPageIndex(table.getState().pagination.pageIndex + 1)
              }
            }}>
            <PaginationNext className="rounded-full" />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>

      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <Text size="sm" weight="bold">
          Resultados por página
        </Text>
        <SelectTableView
          value={pageSize.toString()}
          onValueChange={(value) => table.setPageSize(parseInt(value))}
          options={pageSizeOptions}
          className="w-20"
        />
      </div>
    </div>
  )
}

interface DataTablePageSizeSelectProps {
  setPagination: Dispatch<
    SetStateAction<{
      pageIndex: number
      pageSize: number
    }>
  >
  pagination: {
    pageIndex: number
    pageSize: number
  }
}
export function DataTablePageSizeSelect({
  setPagination,
  pagination,
}: DataTablePageSizeSelectProps) {
  return (
    <div className="flex w-max items-center justify-end gap-2">
      <Text size={'sm'} weight={'bold'} className="w-max">
        Linhas por página
      </Text>
      <SelectTableView
        value={pagination.pageSize.toString()}
        onValueChange={(value) =>
          setPagination(() => ({
            pageIndex: 0,
            pageSize: parseInt(value),
          }))
        }
        options={[
          { value: '10', label: '10' },
          { value: '20', label: '20' },
          { value: '25', label: '25' },
          { value: '100', label: '100' },
        ]}
        className="w-max"
      />
    </div>
  )
}
