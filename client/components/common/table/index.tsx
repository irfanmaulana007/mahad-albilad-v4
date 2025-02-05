'use client'

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import Button from 'components/common/button'

interface DataTableProps<TData> {
  data: TData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  title?: string
  additionalFilter?: React.ReactNode
  loading?: boolean
}

export function DataTable<TData>({
  data,
  columns,
  title,
  additionalFilter,
  loading,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      {title && <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>}
      <div className='flex justify-between items-center mb-6'>
        <div className='text-sm text-gray-600'>Total {data.length} items</div>
        <div className='flex items-center gap-4'>
          {additionalFilter && (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-600'>Filter by:</span>
              {additionalFilter}
            </div>
          )}
          <input
            type='text'
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder='Search...'
            className='px-4 py-2 border rounded-lg'
          />
        </div>
      </div>
      <div className='max-h-[calc(100vh-300px)] overflow-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 whitespace-nowrap'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                    onClick={header.column.getToggleSortingHandler()}>
                    <div className='flex items-center gap-2'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() &&
                        (header.column.getIsSorted() === 'asc' ? (
                          <ChevronUpIcon className='w-4 h-4' />
                        ) : (
                          <ChevronDownIcon className='w-4 h-4' />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 text-sm'>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {columns.map((column, key) => (
                      <td key={column.id} className='px-6 py-4 text-center'>
                        <span className='animate-pulse block bg-gray-200 rounded-md text-transparent'>
                          {key}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='px-6 py-4'>
                        <span className='line-clamp-2'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4 flex items-center justify-center'>
        <div className='flex items-center gap-6'>
          <div className='flex gap-2'>
            <Button
              variant='transparent'
              size='sm'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <ChevronDoubleLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='transparent'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>

            {/* Add page number buttons */}
            {Array.from({ length: table.getPageCount() }, (_, i) => {
              // Show first page, last page, and pages around current page
              if (
                i === 0 ||
                i === table.getPageCount() - 1 ||
                (i >= table.getState().pagination.pageIndex - 1 &&
                  i <= table.getState().pagination.pageIndex + 1)
              ) {
                return (
                  <Button
                    key={i}
                    variant={
                      table.getState().pagination.pageIndex === i ? 'primary' : 'transparent'
                    }
                    size='sm'
                    onClick={() => table.setPageIndex(i)}>
                    {i + 1}
                  </Button>
                )
              }
              // Show ellipsis
              if (i === 1 || i === table.getPageCount() - 2) {
                return (
                  <span key={i} className='px-2'>
                    ...
                  </span>
                )
              }
              return null
            })}

            <Button
              variant='transparent'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='transparent'
              size='sm'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <ChevronDoubleRightIcon className='h-4 w-4' />
            </Button>
          </div>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className='block rounded-md focus-visible:outline-none text-sm py-1 cursor-pointer'>
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
