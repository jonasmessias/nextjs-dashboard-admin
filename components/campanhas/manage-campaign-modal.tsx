import { FormItem } from '@/components/global/form-item'
import { ManageModal } from '@/components/global/manage-modal'
import { Text } from '@/components/global/text'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CampaignFormSchema, CampaignFormSchemaInfer } from '@/schemas/filters'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, Megaphone } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SEGMENT_OPTIONS = [
  { label: 'Pizzaria', value: 'pizza' },
  { label: 'Restaurante', value: 'restaurant' },
  { label: 'Padaria', value: 'bakery' },
  { label: 'Outros', value: 'other' },
]

const CLIENT_OPTIONS = [
  { label: 'Todos consumidores', value: 'all' },
  { label: 'Aniversariantes', value: 'birthday' },
  { label: 'Consumiram há mais de 30 dias', value: '30days' },
  { label: 'Prestes a diminuir pontos luppa', value: 'decrease' },
]

interface ManageCampaignModalProps {
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export const ManageCampaignModal = ({ isOpen, onOpenChange }: ManageCampaignModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const form = useForm<CampaignFormSchemaInfer>({
    resolver: zodResolver(CampaignFormSchema),
    defaultValues: {
      segment: '',
      message: '',
      clients: [],
      multiplier: 2,
      validity: 3,
      notificationCost: 0.3,
    },
  })

  const onSubmit = () => {
    toast.success('Campanha criada com sucesso!')
    setIsModalOpen(false)
    onOpenChange?.(false)
    form.reset()
  }

  return (
    <ManageModal
      trigger={
        <Button onClick={() => setIsModalOpen(true)}>
          <CirclePlus size={16} /> Nova Campanha
        </Button>
      }
      isOpen={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open)
        onOpenChange?.(open)
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <ScrollArea className="max-h-[calc(100vh-232px)] flex-1">
            <div className="flex items-center gap-2 h-22 px-6">
              <div className="flex items-center justify-center bg-yellow-300 rounded-full size-10">
                <Megaphone size={20} className="text-black-900" />
              </div>
              <Text size="huge" weight="bold">
                Nova Campanha
              </Text>
            </div>
            <div className="flex flex-col gap-6 w-full min-w-[400px] py-6 px-6">
              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="select"
                    label="Segmento"
                    placeholder="Selecione o segmento"
                    options={SEGMENT_OPTIONS}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="textarea"
                    label="Mensagem"
                    placeholder="Ex: Pizza com pontos em dobro pelo luppa!"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="clients"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="checkbox"
                    label="Clientes"
                    options={CLIENT_OPTIONS}
                  />
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="multiplier"
                  render={({ field }) => (
                    <FormItem
                      field={field}
                      fieldType="input"
                      label="Multiplicador"
                      type="number"
                      min={1}
                      placeholder="x1"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="validity"
                  render={({ field }) => (
                    <FormItem
                      field={field}
                      fieldType="input"
                      label="Validade"
                      type="number"
                      placeholder="3 dias"
                      mask={{
                        pattern: "9[9]",
                        showPlaceholder: false
                      }}
                    />
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notificationCost"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="input"
                    label="Valor por notificação"
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="R$0,30"
                  />
                )}
              />
            </div>
          </ScrollArea>
          <div className="flex w-full items-center justify-center gap-4 p-6 border-t">
            <DialogClose asChild>
              <Button variant="ghost" type="button" className="w-full max-w-[180px] flex-1">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full max-w-[180px] flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </ManageModal>
  )
} 