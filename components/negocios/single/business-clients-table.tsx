"use client";

import { CellContent, DataTable, HeaderButton } from "@/components/global/data-table";
import { TableFilter } from "@/components/global/input-table-filters";
import { DataTablePagination } from "@/components/global/pagination";
import { Text } from "@/components/global/text";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/hooks/use-business";
import { formatDate } from "@/lib/helpers/date-helpers";
import { formatPrice } from "@/lib/helpers/format-price";
import { translateUserStatus } from "@/lib/helpers/status-helpers";
import type { Status } from "@/types/user";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";

export type BusinessClient = {
  id: string
  name: string
  date: string
  value: number
  points: number
  status: Status | null
  statusExpiresAt: string
  imageUrl: string
};

export function BusinessClientsTable() {
  const params = useParams()
  const businessId = params.id as string
  const { data: business, isLoading, error } = useBusiness(businessId)

  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Função para calcular status baseado nos pontos
  const calculateStatus = (points: number): Status => {
    if (!business) return null
    if (points >= business.diamondMinPoints) return 'diamond'
    if (points >= business.goldMinPoints) return 'gold'
    if (points >= business.silverMinPoints) return 'silver'
    return null
  }

  // Converter transações para o formato esperado pela tabela
  const transactions = business?.Transaction || []
  
  // Filtrar apenas transações aprovadas e converter para o formato da tabela
  const clientsData: BusinessClient[] = transactions
    .filter(transaction => transaction.status === 'approved')
    .map(transaction => ({
      id: transaction.id,
      name: transaction.user?.name || 'N/A',
      date: transaction.createdAt,
      value: transaction.price, // Manter em centavos para usar o helper
      points: transaction.points,
      status: calculateStatus(transaction.points),
      statusExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 ano
      imageUrl: '',
    }))

  const columns: ColumnDef<BusinessClient>[] = [
    {
      accessorKey: "name",
      size: 500,
      header: ({ column }) => <HeaderButton column={column} title="Cliente" iconName="UserRound" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <CellContent className="font-extrabold">{row.original.name}</CellContent>
        </div>
      ),
    },
    {
      accessorKey: "date",
      size: 160,
      header: ({ column }) => <HeaderButton column={column} title="Data do consumo" />,
      cell: ({ row }) => <CellContent>{formatDate(row.original.date)}</CellContent>,
    },
    {
      accessorKey: "value",
      size: 100,
      header: ({ column }) => <HeaderButton column={column} title="Valor" />,
      cell: ({ row }) => <CellContent>{formatPrice(row.original.value)}</CellContent>,
    },
    {
      accessorKey: "points",
      size: 100,
      header: ({ column }) => <HeaderButton column={column} title="Pontos" />,
      cell: ({ row }) => <CellContent>{`+${row.original.points}`}</CellContent>,
    },
    {
      accessorKey: "status",
      size: 120,
      header: ({ column }) => <HeaderButton column={column} title="Status" />,
      cell: ({ row }) => <CellContent>{translateUserStatus(row.original.status)}</CellContent>,
    },
  ]

  const table = useReactTable({
    data: clientsData,
    columns,
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

  if (isLoading) {
    return <div>Carregando transações...</div>
  }

  if (error) {
    return <div>Erro ao carregar transações</div>
  }

  return (
    <div className="flex flex-col gap-10 mt-10">
      <Text size="huge" weight="extraBold" >Clientes e Pagamentos</Text>
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
      <DataTable table={table} columns={columns} />
      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-end">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  )
} 