
import { api } from "@/lib/axios/authorized-axios"
import { unapi } from "@/lib/axios/unauthorized-axios"
import { sendCodeSchema, validateCodeSchema } from "@/schemas/login"
import { AxiosError } from "axios"
import { deleteCookie, setCookie } from "cookies-next"
import { z } from "zod"

/**
 * Actions de autenticação
 * 
 * Este arquivo contém as funções de autenticação do sistema.
 * Configurado para trabalhar com autenticação JWT e roles.
 * 
 * TODO: Ajustar endpoints conforme API backend
 * TODO: Atualizar tipos conforme contrato da API
 */

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "business" | "client"
}

type postConfirmCodeResponse = {
  session: {
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt: Date
    userId: string
  }
  token: string
  role: User["role"]
}

const unauthorizeRole = () => {
  deleteCookie("token_dashboard_app")
  deleteCookie("role_dashboard_app")
  throw new AxiosError<{ error: string }>(
    "Somente administradores podem acessar esta página, seu usuário tem permissão somente para o APP.",
    "401",
    undefined,
    {
      data: {
        error:
          "Somente administradores podem acessar esta página, seu usuário tem permissão somente para o APP.",
      },
      status: "401",
      statusText: "Unauthorized",
      headers: {},
      config: {},
    }
  )
}

/**
 * Envia código de verificação para o email
 * TODO: Ajustar endpoint conforme API
 */
export async function sendVerificationCode(
  data: z.infer<typeof sendCodeSchema>
) {
  const response = await unapi.post(`/v1/login`, {
    email: data.email,
  })
  return response.data
}

/**
 * Valida código de verificação e faz login
 * TODO: Ajustar endpoint conforme API
 */
export async function loginByEmailCode(
  email: string,
  data: z.infer<typeof validateCodeSchema>
): Promise<postConfirmCodeResponse> {
  const response = await unapi.post(`/v1/confirmCode`, {
    email: email,
    code: data.code,
  })

  if (response.data?.role !== "admin") {
    unauthorizeRole()
  }
  return response.data
}

/**
 * Busca dados do usuário autenticado
 * TODO: Ajustar endpoint conforme API
 */
export async function getUser(): Promise<User> {
  try {
    const response = await api.get("/v1/me")

    if (response.data?.role !== "admin") {
      unauthorizeRole()
    }

    setCookie("role_dashboard_app", response.data.role)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 * Handler de sucesso no login - armazena tokens e role
 */
export function confirmCodeSuccessHandler({
  role,
  session,
  token,
}: postConfirmCodeResponse) {
  setCookie("token_dashboard_app", token, {
    expires: new Date(session?.expiresAt || ""),
  })
  setCookie("role_dashboard_app", role, {
    expires: new Date(session?.expiresAt || ""),
  })
} 