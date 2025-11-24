"use client"

import { errorHandler } from "@/lib/helpers/error-handler"
import { sendCodeSchema, validateCodeSchema } from "@/schemas/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next"
import { isEmpty } from "lodash"
import { useRouter } from "next/navigation"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { FormItem } from "../global/form-item"
import { Text } from "../global/text"
import { Button } from "../ui/button"
import { Form, FormField } from "../ui/form"
import { loginByEmailCode, sendVerificationCode } from "./actions"

export const LoginForm = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Text size={"xl"} weight={"bold"}>
          {step === 1 ? "Bem vindo!" : "Digite seu código"}
        </Text>
        <Text size={"xs"}>
          {step === 1
            ? "Por favor insira o seu e-mail"
            : "Você recebeu o código no email"}
        </Text>
      </div>
      <div className="w-full max-w-sm mx-auto">
        {step === 1 && <SendCodeForm setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <ValidateCodeForm setStep={setStep} email={email} />}
      </div>
    </>
  )
}

interface Props {
  setStep: Dispatch<SetStateAction<number>>
  setEmail?: Dispatch<SetStateAction<string>>
}

const SendCodeForm: FC<Props> = ({ setStep, setEmail }) => {
  const form = useForm<z.infer<typeof sendCodeSchema>>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: {
      email: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["send-verification-code"],
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      setEmail?.(form.getValues("email").trim().toLowerCase())
      setStep(2)
      toast.success("Código enviado com sucesso!")
    },
    onError: errorHandler,
  })

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit((value) => {
          mutate({email: value.email.trim().toLowerCase()})
        })}
      >
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="input"
              label="E-mail"
              aria-label="E-mail"
              placeholder="email@email.com"
            />
          )}
        />
        <Button
          type="submit"
          isLoading={isPending}
          loadingTitle="Enviando código..."
        >
          Entrar
        </Button>
      </form>
    </Form>
  )
}

const ValidateCodeForm: FC<Props & { email: string }> = ({
  setStep,
  email,
}) => {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof validateCodeSchema>>({
    resolver: zodResolver(validateCodeSchema),
    defaultValues: {
      email: email,
      code: "",
    },
  })

  console.log(form.formState.errors)

  const { mutate, isPending } = useMutation({
    mutationKey: ["login-by-email-code"],
    mutationFn: (data: z.infer<typeof validateCodeSchema>) =>
      loginByEmailCode(email, data),
    onSuccess: (response) => {
      setCookie("token_dashboard_app", response.token, {
        expires: new Date(response.session.expiresAt),
      })
      setCookie("role_dashboard_app", response.role, {
        expires: new Date(response.session.expiresAt),
      })
      toast.success("Login realizado com sucesso!")
      push("/dashboard")
    },
    onError: errorHandler,
  })

  if (isEmpty(email)) {
    setStep(1)
  }

  return (
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit((value) => mutate(value))}
        >
          <FormField
            control={form.control}
            name={"code"}
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="otp"
                maxLength={6}
                className="flex flex-col items-center"
              />
            )}
          />
          <Button
            type="submit"
            isLoading={isPending}
            loadingTitle="Validando código..."
          >
            Entrar
          </Button>
          <Button variant={"ghost"} onClick={() => setStep(1)}>
            Alterar e-mail       
          </Button>
        </form>
      </Form>
  )
}

