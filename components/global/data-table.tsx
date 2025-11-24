import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  Column,
  ColumnDef,
  flexRender,
  RowData,
  Table as TableType,
} from '@tanstack/react-table'
import * as LucideIcons from 'lucide-react'
import { ArrowDownUp } from 'lucide-react'
import { FC, ReactNode, type ComponentType } from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Text } from './text'

interface DataTableProps<TData, TValue> {
  table: TableType<TData>
  columns: ColumnDef<TData, TValue>[]
  classname?: string
}

export const DataTable = <TData, TValue>({
  table,
  columns,
  classname,
}: DataTableProps<TData, TValue>) => {
  return (
    <div className="h-full w-full rounded-2xl border flex flex-col overflow-hidden">
      <Table className={cn('w-full min-w-[1200px] flex-1', classname)}>
        <TableHeader className="bg-black-30 sticky top-0 z-10">
          {table.getHeaderGroups().map(({ id, headers }) => (
            <TableRow
              key={id}
              className="hover:bg-black-30 space-x-9 border-none">
              {headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    'h-12 border-none p-0 pl-4 whitespace-nowrap',
                    index === 0 && 'rounded-tl-2xl',
                    index === headers.length - 1 && 'rounded-tr-2xl pr-4'
                  )}
                  style={{
                    width: header.column.columnDef.size
                      ? `${header.column.columnDef.size}px`
                      : 'auto',
                    minWidth: header.column.columnDef.minSize
                      ? `${header.column.columnDef.minSize}px`
                      : 'auto',
                    maxWidth: header.column.columnDef.maxSize
                      ? `${header.column.columnDef.maxSize}px`
                      : 'auto',
                  }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="max-h-[calc(100vh-22rem)] overflow-y-auto">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="hover:bg-black-20">
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'h-12 p-0 pl-4 whitespace-nowrap',
                      index === row.getAllCells().length - 1 && 'pr-4'
                    )}
                    style={{
                      width: cell.column.columnDef.size
                        ? `${cell.column.columnDef.size}px`
                        : 'auto',
                      minWidth: cell.column.columnDef.minSize
                        ? `${cell.column.columnDef.minSize}px`
                        : 'auto',
                      maxWidth: cell.column.columnDef.maxSize
                        ? `${cell.column.columnDef.maxSize}px`
                        : 'auto',
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <Text size="md" weight="regular" className="p-3">
                  Nenhum item encontrado
                </Text>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getRowModel().rows.length > 0 && (
        <div className="bg-black-30 h-10 rounded-b-2xl" />
      )}
    </div>
  )
}

interface HeaderButtonProps<T extends RowData> {
  column: Column<T, unknown>
  title: string
  sortable?: boolean
  iconName?: keyof typeof LucideIcons
  classname?: string
}

export const HeaderButton = <T extends RowData>({
  column,
  title,
  sortable = true,
  iconName,
  classname,
}: HeaderButtonProps<T>) => {

  const Icon = iconName ? LucideIcons[iconName] as ComponentType<{ size?: number; className?: string }> : null

  if (sortable) {
    return (
      <Button
        variant="ghost"
        type="button"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className={cn(
          'text-black-200 hover:text-black-500 p-0 text-xs hover:bg-transparent',
          classname
        )}>
        {Icon && <Icon size={16} />}
        {title}
        <ArrowDownUp size={16} />
      </Button>
    )
  } else {
    return (
      <Text size={'md'} weight={'bold'} className={cn(classname)}>
        {title}
      </Text>
    )
  }
}

interface CellContentProps {
  children: ReactNode
  bold?: boolean
  className?: string
}

export const CellContent: FC<CellContentProps> = ({
  children,
  bold,
  className,
}) => {
  return (
    <Text
      size={'xs'}
      weight={bold ? 'bold' : 'regular'}
      tag={'div'}
      className={cn('overflow-hidden text-ellipsis', className)}>
      {children}
    </Text>
  )
}

export const DataTableSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full items-center justify-between gap-2">
        <Skeleton className="h-10 w-[360px] rounded-5xl" />
        <Skeleton className="h-10 w-24 rounded-5xl" />
      </div>
      
      <div className="h-full w-full rounded-2xl border flex flex-col overflow-hidden">
        <div className="w-full min-w-[1200px] flex-1">
          <div className="bg-black-30 sticky top-0 z-10">
            <div className="h-12 flex border-none w-full">
              <div className="h-12 flex-[500] p-0 pl-4 rounded-tl-2xl flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-12 flex-[200] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="h-12 flex-[145] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="h-12 flex-[150] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="h-12 flex-[180] p-0 pl-4 flex items-center">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="h-12 flex-[150] p-0 pl-4 pr-4 rounded-tr-2xl flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          
          <div className="max-h-[calc(100vh-22rem)] overflow-y-auto">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="h-12 flex hover:bg-black-20 w-full">
                <div className="h-12 flex-[500] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="h-12 flex-[200] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="h-12 flex-[145] p-0 pl-4 flex items-center justify-center">
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="h-12 flex-[150] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="h-12 flex-[180] p-0 pl-4 flex items-center">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="h-12 flex-[150] p-0 pl-4 pr-4 flex items-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-black-30 h-10 rounded-b-2xl" />
      </div>
      
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Skeleton className="h-4 w-24" />
        </div>
        
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}
