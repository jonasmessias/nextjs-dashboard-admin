import { Button } from "@/components/ui/button"
import { Trash2, X } from "lucide-react"
import React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"

interface Props {
  children: React.ReactNode
  trigger: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  showDeleteButton?: boolean
  onDelete?: () => void
  deleteButtonAriaLabel?: string
}

export const ManageModal = ({
  children,
  trigger,
  isOpen,
  onOpenChange,
  showDeleteButton = false,
  onDelete,
  deleteButtonAriaLabel,
  ...props
}: Props & React.ComponentProps<typeof DialogContent>) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="p-0 max-w-[512px] h-auto max-sm:max-h-screen max-sm:max-w-[calc(100%-16px)] gap-0 overflow-hidden"
        {...props}
        showCloseButton={false}
      >
        <DialogHeader className="h-[56px] p-2 flex-row items-center justify-between bg-black-0 border-b border-b-black-40 space-y-0">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" aria-label="Fechar">
              <X size={16} />
            </Button>
          </DialogClose>
          <DialogTitle className="text-black-900 text-xl font-semibold" />
          {showDeleteButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              aria-label={deleteButtonAriaLabel || "Deletar"}
            >
              <Trash2 size={16} className="text-system-medium-red" />
            </Button>
          )}
        </DialogHeader>
        <div className="max-h-[calc(100vh-144px)] h-full overflow-hidden">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
