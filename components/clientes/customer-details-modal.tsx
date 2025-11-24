import { FormItem } from '@/components/global/form-item'
import { ManageModal } from '@/components/global/manage-modal'
import { Text } from '@/components/global/text'
import { Form, FormField } from '@/components/ui/form'
import type { User } from '@/types/user'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { UserRound } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  phone: string
  location: string
  birtDate: string
  createdAt: string
}

interface CustomerDetailsModalProps {
  customer: User
  trigger: React.ReactNode
  onDelete?: () => void
}

export const CustomerDetailsModal = ({ customer, trigger, onDelete }: CustomerDetailsModalProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      location: customer.city && customer.state ? `${customer.city} - ${customer.state}` : '',
      birtDate: customer.birtDate
        ? format(parseISO(customer.birtDate), "dd/MMM", { locale: ptBR })
        : '',
      createdAt: customer.createdAt
        ? format(parseISO(customer.createdAt), "dd/MM/yyyy", { locale: ptBR })
        : '',
    },
  })

  return (
    <ManageModal
      trigger={trigger}
      isOpen={undefined}
      onOpenChange={undefined}
      onOpenAutoFocus={e => e.preventDefault()}
      showDeleteButton={!!onDelete}
      onDelete={onDelete}
    >
      <Form {...form}>
        <form className="flex flex-col h-full">
          <div className="flex flex-col gap-4 w-full py-6 px-6 pointer-events-none">
            <div className="flex items-center gap-2 h-22">
              <div className="flex items-center justify-center bg-yellow-300 rounded-full size-10">
                <UserRound size={20} className="text-black-900" />
              </div>
              <Text size="huge" weight="bold">
                {customer.name}
              </Text>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem field={field} fieldType="input" label="Nome" />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem field={field} fieldType="input" label="E-mail" />
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem field={field} fieldType="input" label="Telefone" />
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem field={field} fieldType="input" label="Localização" />
              )}
            />
            <FormField
              control={form.control}
              name="birtDate"
              render={({ field }) => (
                <FormItem field={field} fieldType="input" label="Aniversário" />
              )}
            />
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem field={field} fieldType="input" label="Cadastro" />
              )}
            />
          </div>
        </form>
      </Form>
    </ManageModal>
  )
} 