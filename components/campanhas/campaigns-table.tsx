'use client'

import { ManageCampaignModal } from '@/components/campanhas/manage-campaign-modal'
import { CellContent, DataTable, HeaderButton } from '@/components/global/data-table'
import { TableFilter } from '@/components/global/input-table-filters'
import { DataTablePagination } from '@/components/global/pagination'
import { Popover } from '@/components/global/popover'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatRelativeExpiration, isNearRelativeExpiration, isRelativeExpired } from '@/lib/helpers/date-helpers'
import { translateStatus } from '@/lib/helpers/status-helpers'
import { cn } from '@/lib/utils'
import type { Campaign } from '@/types/campaigns'
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import { Suspense, useState } from 'react'

export const CampaignsTable = ({ campaigns }: { campaigns: Campaign[] }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  })

  const table = useReactTable({
    data: campaigns,
    columns: campaignColumns,
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
        </Suspense>
        <ManageCampaignModal />
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
          columns={campaignColumns}
          classname="h-fit"
        />
      </div>
      <div className="flex items-center justify-end">
        {table.getRowModel().rows.length > 0 && <DataTablePagination table={table} />}
      </div>
    </div>
  )
}

const campaignColumns: ColumnDef<Campaign>[] = [
  {
    id: 'options',
    size: 88,
    cell: () => {
      return (
        <Popover
          className="flex w-[232px] max-w-[232px] flex-col gap-2"
          align="start"
          trigger={
            <Button
              variant={'ghost'}
              size={'icon'}
              className="data-[state=open]:bg-black-40">
              <MoreVertical/>
            </Button>
          }>
          <div className="flex flex-col items-center justify-center gap-2">
            {/* Add campaign management options here */}
          </div>
        </Popover>
      )
    },
  },
  {
    accessorKey: 'segment',
    size: 170,
    header: ({ column }) => <HeaderButton column={column} title="Segmento" iconName="Briefcase" />,
    cell: ({ row }) => (
      <CellContent className="w-full">{row.original.segment}</CellContent>
    ),
  },
  {
    accessorKey: 'message',
    size: 320,
    header: ({ column }) => <HeaderButton column={column} title="Mensagem" iconName="Megaphone" />,
    cell: ({ row }) => (
      <CellContent className="w-full">{row.original.message}</CellContent>
    ),
  },
  {
    accessorKey: 'client',
    size: 216,
    header: ({ column }) => <HeaderButton column={column} title="Cliente" iconName="UserRound" />,
    cell: ({ row }) => (
      <CellContent className="w-full">{row.original.client}</CellContent>
    ),
  },
  {
    accessorKey: 'multiplier',
    size: 130,
    header: ({ column }) => <HeaderButton column={column} title="Multiplicador" />,
    cell: ({ row }) => (
      <CellContent className="w-full text-center">{row.original.multiplier}x</CellContent>
    ),
  },
  {
    accessorKey: 'validity',
    size: 130,
    header: ({ column }) => <HeaderButton column={column} title="Validade" />,
    cell: ({ row }) => {
      const relativeExpiration = row.original.validity
      const createdAt = row.original.createdAt || new Date()
      
      const timeRemaining = formatRelativeExpiration(createdAt, relativeExpiration)
      const isExpiredValue = isRelativeExpired(createdAt, relativeExpiration)
      const isNearExp = isNearRelativeExpiration(createdAt, relativeExpiration)
      
      let className = 'w-full'
      
      if (isExpiredValue) {
        className += ' text-red-600 font-medium'
      } else if (isNearExp) {
        className += ' text-orange-600 font-medium'
      }
      
      return (
        <CellContent className={className}>
          {timeRemaining}
        </CellContent>
      )
    },
  },
  {
    accessorKey: 'notificationCost',
    size: 150,
    header: ({ column }) => <HeaderButton column={column} title="R$/Notificação" />,
    cell: ({ row }) => (
      <CellContent className="w-full">
        R$ {row.original.notificationCost.toFixed(2)}
      </CellContent>
    ),
  },
  {
    accessorKey: 'status',
    size: 130,
    header: ({ column }) => <HeaderButton column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status
      const label = translateStatus(status)
      return (
        <CellContent className="w-full flex items-center justify-center">
          <Badge variant={status}>
            {label}
          </Badge>
        </CellContent>
      )
    },
  },
  {
    accessorKey: 'business',
    size: 230,
    header: ({ column }) => <HeaderButton column={column} title="Negócio" iconName="Store" />,
    cell: ({ row }) => (
      <CellContent className="w-full font-extrabold">{row.original.business}</CellContent>
    ),
  },
  {
    accessorKey: 'cnpj',
    size: 140,
    header: ({ column }) => <HeaderButton column={column} title="CNPJ" />,
    cell: ({ row }) => (
      <CellContent className="w-full">{row.original.cnpj}</CellContent>
    ),
  },
  {
    accessorKey: 'totalValue',
    size: 130,
    header: ({ column }) => <HeaderButton column={column} title="Valor Total" />,
    cell: ({ row }) => (
      <CellContent className="w-full">
        R$ {row.original.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </CellContent>
    ),
  },
]

