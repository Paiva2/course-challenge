"use client"

import React, { FormEvent, useEffect, useRef, useState } from "react"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { AxiosError } from "axios"
import api from "@/lib/api"
import * as S from "./styles"

interface IFormErrors {
  email: string
  password: string
  confirmPassword: string
}

const ForgotPasswordComponent = () => {
  const emailFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const passwordFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const passwordConfirmationRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const [formErrors, setFormErrors] = useState({} as IFormErrors)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [apiErrors, setApiErrors] = useState("")
  const [apiSuccess, setApiSuccess] = useState("")

  async function submitInformations() {
    try {
      const submitRecoverPassword = await api.patch("/password", {
        email: emailFieldRef.current?.value,
        newPassword: passwordFieldRef.current?.value,
        passwordConfirmation: passwordConfirmationRef.current?.value,
      })

      if (submitRecoverPassword.status === 200) {
        setApiSuccess(submitRecoverPassword.data.message)

        emailFieldRef.current.value = ""
        passwordFieldRef.current.value = ""
        passwordConfirmationRef.current.value = ""

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

    if (passwordFieldRef.current.value.length < 6) {
      errors.password = "A senha precisa ter pelo menos 6 caracteres"
    }

    if (
      !passwordFieldRef.current.value.length ||
      passwordConfirmationRef.current.value !== passwordFieldRef.current.value
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
    <S.ForgotPasswordContainer>
      <S.ForgotPasswordWrapper>
        <S.ForgotPasswordForm onSubmit={handleInitSubmit}>
          <S.ForgotPasswordFormTitle>
            <h1>Recuperar senha</h1>

            <p>Esqueceu sua senha? Recupere preenchendo o formulário!</p>
          </S.ForgotPasswordFormTitle>

          <S.ForgotPasswordFields>
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
              Nova Senha
              <input
                ref={passwordFieldRef}
                placeholder="Digite sua nova senha"
                type="password"
              />
              {formErrors.password && (
                <p className="validationError">{formErrors.password}</p>
              )}
            </S.FormLabel>

            <S.FormLabel $isError={false}>
              Confirmar senha
              <input
                ref={passwordConfirmationRef}
                placeholder="Confirme sua nova senha"
                type="password"
              />
              {formErrors.confirmPassword && (
                <p className="validationError">{formErrors.confirmPassword}</p>
              )}
            </S.FormLabel>
          </S.ForgotPasswordFields>

          <span>
            Já possui uma conta? Faça{" "}
            <a href="/entrar">
              login aqui! <ExternalLink size={18} />
            </a>
          </span>

          <S.ApiError>{apiErrors && <p>{apiErrors}</p>}</S.ApiError>
          <S.ApiSuccess>{apiSuccess && <p>{apiSuccess}</p>}</S.ApiSuccess>

          <S.ForgotPasswordButton type="submit" disabled={formSubmitting}>
            Recuperar
          </S.ForgotPasswordButton>

          <span>
            Não possui uma conta? Se{" "}
            <a href="/registro">
              registre aqui! <ExternalLink size={18} />
            </a>
          </span>

          <S.BackLink href="/">
            <ChevronLeft color="#fff" size={25} />
          </S.BackLink>
        </S.ForgotPasswordForm>
      </S.ForgotPasswordWrapper>
    </S.ForgotPasswordContainer>
  )
}

export default ForgotPasswordComponent
