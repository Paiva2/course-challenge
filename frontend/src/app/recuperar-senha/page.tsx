import React from "react"
import ForgotPasswordComponent from "@/components/ForgotPasswordComponent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos - Recuperar senha",
  description: "Página de recuperação da senha para estudantes e professores.",
}

const RecoverPassword = () => {
  return <ForgotPasswordComponent />
}

export default RecoverPassword
