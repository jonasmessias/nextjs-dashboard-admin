'use client'

import { CellContent, DataTable, HeaderButton } from '@/components/global/data-table'
import { TableFilter } from '@/components/global/input-table-filters'
import { DataTablePagination } from '@/components/global/pagination'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table'
import { Filter } from 'lucide-react'
import { Suspense, useState } from 'react'
import { CustomerDetailsModal } from './customer-details-modal'

export const CustomersTable = ({ customers }: { customers: User[] }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const handleDeleteUser = (userId: string) => {
    // = React Query, API, etc
    // deleteCustomerMutate(userId)
    alert(`Deletar usuário: ${userId}`)
  }

  const customerColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      size: 500,
      header: ({ column }) => <HeaderButton column={column} title="Cliente" iconName="UserRound" />,
      cell: ({ row }) => (
        <CustomerDetailsModal
          customer={row.original}
          trigger={
            <Button
              variant="link"
              className='w-full justify-start text-start'
            >
              {row.original.name || 'N/A'}
            </Button>
          }
          onDelete={() => handleDeleteUser(row.original.id)}
        />
      ),
    },
    {
      accessorKey: 'email',
      size: 200,
      header: ({ column }) => <HeaderButton column={column} title="E-mail" iconName="Mail" />,
      cell: ({ row }) => (
        <CellContent className="w-full">{row.original.email || 'N/A'}</CellContent>
      ),
    },
    {
      accessorKey: 'birtDate',
      size: 145,
      header: ({ column }) => <HeaderButton column={column} title="Aniversário" iconName="Cake" />,
      cell: ({ row }) => {
        if (!row.original.birtDate) return <CellContent className="w-full">N/A</CellContent>
        
        const date = new Date(row.original.birtDate)
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleDateString('pt-BR', { month: 'short' })
        
        return (
          <CellContent className="w-full text-center">{`${day}/${month}`}</CellContent>
        )
      },
    },
    {
      accessorKey: 'phone',
      size: 150,
      header: ({ column }) => <HeaderButton column={column} title="Telefone" iconName="Phone" />,
      cell: ({ row }) => (
        <CellContent className="w-full">{row.original.phone || 'N/A'}</CellContent>
      ),
    },
    {
      accessorKey: 'location',
      size: 180,
      header: ({ column }) => <HeaderButton column={column} title="Localização" iconName="MapPin" />,
      cell: ({ row }) => {
        const city = row.original.city
        const state = row.original.state
        
        if (!city || !state) return <CellContent className="w-full">N/A</CellContent>
        
        return (
          <CellContent className="w-full">{`${city} - ${state}`}</CellContent>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      size: 150,
      header: ({ column }) => <HeaderButton column={column} title="Cadastro"/>,
      cell: ({ row }) => {
        if (!row.original.createdAt) return <CellContent className="w-full">N/A</CellContent>
        
        const date = new Date(row.original.createdAt)
        return (
          <CellContent className="w-full">
            {date.toLocaleDateString('pt-BR')}
          </CellContent>
        )
      },
    },
  ]

  const table = useReactTable({
    data: customers,
    columns: customerColumns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
  })

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full items-center justify-between gap-2">
        <Suspense>
          <TableFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            className="w-full max-w-[360px]"
          />
          <Button>
            <Filter />
            Filtros
          </Button>
        </Suspense>
      </div>
      <div
        className={cn(
          'overflow-hidden',
          table.getPageCount() > 1
            ? 'max-h-[calc(100vh-177px)]'
            : 'max-h-[calc(100vh-105px)]'
        )}>
        <DataTable
          table={table}
          columns={customerColumns}
          classname="h-fit"
        />
      </div>
      <div className="flex items-center justify-end">
        {table.getRowModel().rows.length > 0 && <DataTablePagination table={table} />}
      </div>
    </div>
  )
}

