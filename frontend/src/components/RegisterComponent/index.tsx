"use client"

import React, { FormEvent, useEffect, useRef, useState } from "react"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { AxiosError } from "axios"
import api from "@/lib/api"
import * as S from "./styles"

interface IFormErrors {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterComponent = () => {
  const nameFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const emailFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const passwordFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const confirmPasswordFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const [formErrors, setFormErrors] = useState({} as IFormErrors)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [apiSuccess, setApiSuccess] = useState("")
  const [apiErrors, setApiErrors] = useState("")

  async function submitInformations() {
    try {
      const submitRegister = await api.post("/register", {
        name: nameFieldRef?.current?.value,
        email: emailFieldRef?.current?.value,
        password: passwordFieldRef?.current?.value,
        passwordConfirmation: confirmPasswordFieldRef?.current?.value,
      })

      if (submitRegister.status === 201) {
        setApiSuccess(submitRegister.data.message)

        nameFieldRef.current.value = ""
        passwordFieldRef.current.value = ""
        confirmPasswordFieldRef.current.value = ""
        emailFieldRef.current.value = ""

        setTimeout(() => setApiSuccess(""), 4000)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setApiErrors(e.response?.data.message)
      }
    } finally {
      setFormSubmitting(false)
    }
  }

  function checkFormErrors() {
    const errors = {} as IFormErrors

    if (nameFieldRef.current.value.length < 3) {
      errors.name = "O nome precisa ter pelo menos 3 caracteres"
    }

    if (passwordFieldRef.current.value.length < 6) {
      errors.password = "A senha precisa ter pelo menos 6 caracteres"
    }

    if (
      !passwordFieldRef.current.value.length ||
      confirmPasswordFieldRef.current.value !== passwordFieldRef.current.value
    ) {
      errors.confirmPassword = "A confirmação de senha precisa ser igual a senha"
    }

    setFormErrors(errors)
  }

  function handleInitSubmit(e: FormEvent) {
    e.preventDefault()

    checkFormErrors()

    setApiErrors("")

    setFormSubmitting(true)
  }

  useEffect(() => {
    const doesFormHasErrors = Object.keys(formErrors)

    if (!doesFormHasErrors.length && formSubmitting) {
      submitInformations()
    } else {
      setFormSubmitting(false)
    }
  }, [formErrors])

  return (
    <S.RegisterContainer>
      <S.RegisterWrapper>
        <S.RegisterForm onSubmit={handleInitSubmit}>
          <S.RegisterFormTitle>
            <h1>Registre-se</h1>

            <p>Bem vindo! Crie uma conta e adquira novos cursos!</p>
          </S.RegisterFormTitle>

          <S.RegisterFields>
            <S.FormLabel $isError={false}>
              Nome
              <input ref={nameFieldRef} placeholder="Digite seu nome" type="text" />
              {formErrors.name && (
                <p className="validationError">{formErrors.name}</p>
              )}
            </S.FormLabel>
            <S.FormLabel $isError={false}>
              E-mail
              <input
                ref={emailFieldRef}
                placeholder="Digite seu e-mail"
                type="email"
              />
              {formErrors.email && (
                <p className="validationError">{formErrors.email}</p>
              )}
            </S.FormLabel>
            <S.FormLabel $isError={false}>
              Senha
              <input
                ref={passwordFieldRef}
                placeholder="Digite sua senha"
                type="password"
              />
              {formErrors.password && (
                <p className="validationError">{formErrors.password}</p>
              )}
            </S.FormLabel>

            <S.FormLabel $isError={false}>
              Confirme sua senha
              <input
                ref={confirmPasswordFieldRef}
                placeholder="Confirme sua senha"
                type="password"
              />
              {formErrors.confirmPassword && (
                <p className="validationError">{formErrors.confirmPassword}</p>
              )}
            </S.FormLabel>
          </S.RegisterFields>

          <span>
            <a href="/recuperar-senha">Esqueceu sua senha?</a>
          </span>

          <S.ApiError>{apiErrors && <p>{apiErrors}</p>}</S.ApiError>
          <S.ApiSuccess>{apiSuccess && <p>{apiSuccess}</p>}</S.ApiSuccess>

          <S.RegisterButton type="submit" disabled={formSubmitting}>
            Registrar
          </S.RegisterButton>

          <span>
            Já possui uma conta? Faça{" "}
            <a href="/entrar">
              login aqui! <ExternalLink size={18} />
            </a>
          </span>

          <S.BackLink href="/">
            <ChevronLeft color="#fff" size={25} />
          </S.BackLink>
        </S.RegisterForm>
      </S.RegisterWrapper>
    </S.RegisterContainer>
  )
}

export default RegisterComponent
