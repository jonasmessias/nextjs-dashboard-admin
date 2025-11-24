'use client'

import { CellContent, DataTable, HeaderButton } from '@/components/global/data-table'
import { TableFilter } from '@/components/global/input-table-filters'
import { DataTablePagination } from '@/components/global/pagination'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { translateBusinessCategory } from '@/types/categories'
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
import Link from 'next/link'
import { Suspense, useState } from 'react'

export const BusinessesTable = ({ businesses }: { businesses: User[] }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  
  const businessColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'Business.name',
      size: 500,
      header: ({ column }) => <HeaderButton column={column} title="Negócio" iconName="Building2" />,
      cell: ({ row }) => (
        <Link href={`/negocios/${row.original.Business?.id}`}>
          <Button
            variant="link"
            className='w-full justify-start text-start'
          >
            {row.original.Business?.name || 'N/A'}
          </Button>
        </Link>
      ),
    },
    {
      accessorKey: 'Business.category',
      size: 200,
      header: ({ column }) => <HeaderButton column={column} title="Segmento" iconName="Tag" />,
      cell: ({ row }) => (
        <CellContent className="w-full">
          {row.original.Business?.category ? translateBusinessCategory(row.original.Business.category) : 'N/A'}
        </CellContent>
      ),
    },
    {
      accessorKey: 'email',
      size: 200,
      header: ({ column }) => <HeaderButton column={column} title="E-mail" iconName="Mail" />,
      cell: ({ row }) => (
        <CellContent className="w-full">
          {row.original.email || 'N/A'}
        </CellContent>
      ),
    },
    {
      accessorKey: 'Business.phone',
      size: 150,
      header: ({ column }) => <HeaderButton column={column} title="Telefone" iconName="Phone" />,
      cell: ({ row }) => (
        <CellContent className="w-full">{row.original.Business?.phone || 'N/A'}</CellContent>
      ),
    },
    {
      accessorKey: 'location',
      size: 180,
      header: ({ column }) => <HeaderButton column={column} title="Localização" iconName="MapPin" />,
      cell: ({ row }) => {
        const city = row.original.Business?.city || row.original.city
        const state = row.original.Business?.state || row.original.state
        
        if (!city || !state) return <CellContent className="w-full">N/A</CellContent>
        
        return (
          <CellContent className="w-full">{`${city} - ${state}`}</CellContent>
        )
      },
    },
    {
      accessorKey: 'Business.cnpj',
      size: 150,
      header: ({ column }) => <HeaderButton column={column} title="CNPJ" iconName="FileText" />,
      cell: ({ row }) => (
        <CellContent className="w-full">{row.original.Business?.cnpj || 'N/A'}</CellContent>
      ),
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
    data: businesses,
    columns: businessColumns,
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
          columns={businessColumns}
          classname="h-fit"
        />
      </div>
      <div className="flex items-center justify-end">
        {table.getRowModel().rows.length > 0 && <DataTablePagination table={table} />}
      </div>
    </div>
  )
} 