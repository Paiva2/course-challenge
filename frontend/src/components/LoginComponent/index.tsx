"use client"

import React, { FormEvent, useEffect, useRef, useState } from "react"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import api from "@/lib/api"
import * as S from "./styles"

interface IFormErrors {
  name: string
  password: string
}

const LoginComponent = () => {
  const route = useRouter()

  const emailFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const passwordFieldRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const [formErrors, setFormErrors] = useState({} as IFormErrors)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [apiErrors, setApiErrors] = useState("")

  async function submitInformations() {
    try {
      const submitLogin = await api.post("/login", {
        email: emailFieldRef?.current?.value,
        password: passwordFieldRef?.current?.value,
      })

      if (submitLogin.status === 200) {
        Cookies.set("cursos-auth", submitLogin.data.token, {
          expires: 7,
          path: "/",
        })

        emailFieldRef.current.value = ""
        passwordFieldRef.current.value = ""

        route.push("/")
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

    if (emailFieldRef.current.value.length < 3) {
      errors.name = "O nome precisa ter pelo menos 3 caracteres"
    }

    if (passwordFieldRef.current.value.length < 6) {
      errors.password = "A senha precisa ter pelo menos 6 caracteres"
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
    <S.LoginContainer>
      <S.LoginWrapper>
        <S.LoginForm onSubmit={handleInitSubmit}>
          <S.LoginFormTitle>
            <h1>Entrar</h1>

            <p>Bem vindo! Use suas credenciais para se autenticar!</p>
          </S.LoginFormTitle>

          <S.LoginFields>
            <S.FormLabel $isError={false}>
              E-mail
              <input
                ref={emailFieldRef}
                placeholder="Digite seu e-mail"
                type="email"
              />
              {formErrors.name && (
                <p className="validationError">{formErrors.name}</p>
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
          </S.LoginFields>

          <span>
            <a href="/recuperar-senha">Esqueceu sua senha?</a>
          </span>

          <S.ApiError>{apiErrors && <p>{apiErrors}</p>}</S.ApiError>

          <S.LoginButton type="submit" disabled={formSubmitting}>
            Entrar
          </S.LoginButton>

          <span>
            Não possui uma conta? Se{" "}
            <a href="/registro">
              registre aqui! <ExternalLink size={18} />
            </a>
          </span>

          <S.BackLink href="/">
            <ChevronLeft color="#fff" size={25} />
          </S.BackLink>
        </S.LoginForm>
      </S.LoginWrapper>
    </S.LoginContainer>
  )
}

export default LoginComponent
