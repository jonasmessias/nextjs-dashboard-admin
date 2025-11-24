import { toast } from "sonner"

type ServerError = {
  response?: {
    data?: {
      error?: string
      message?: string
    }
  }
  message?: string
}

export const errorHandler = (error: Error | ServerError) => {
  if ("response" in error) {
    toast.error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Erro interno de servidor!"
    )
  } else {
    toast.error(error.message || "Erro inesperado!")
  }

  // Log error for debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }
}
