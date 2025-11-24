'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FiltersSchema, type FiltersInfer } from '@/schemas/filters'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface TableFilterProps {
  className?: string
  globalFilter?: string
  setGlobalFilter?: (value: string) => void
  useUrlParams?: boolean
}

export const TableFilter = ({
  className,
  globalFilter,
  setGlobalFilter,
  useUrlParams = false,
}: TableFilterProps) => {
  const { push } = useRouter()

  const form = useForm<FiltersInfer>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      search: useSearchParams().get('search') || '',
    },
  })

  const debouncedSetFilter = useCallback(
    (value: string) => {
      if (useUrlParams) {
        form.setValue('search', value)
      } else {
        setGlobalFilter?.(value)
      }
    },
    [setGlobalFilter, form, useUrlParams]
  )

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(debouncedSetFilter, 150)(event.target.value)
  }

  useEffect(() => {
    if (useUrlParams) {
      push(
        `?` +
          queryString.stringify(form.watch(), {
            skipNull: true,
            skipEmptyString: true,
          })
      )
    }
  }, [form, push, useUrlParams])

  return (
    <Input
      placeholder="Pesquisar"
      icon={Search}
      iconSide="right"
      defaultValue={
        useUrlParams ? form.getValues('search') : (globalFilter ?? '')
      }
      onChange={handleFilterChange}
      className={cn('max-w-[336px]', className)}
    />
  )
}
