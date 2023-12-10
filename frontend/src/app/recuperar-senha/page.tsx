import React from "react"
import ForgotPasswordComponent from "@/components/ForgotPasswordComponent"
import NoAuthPage from "@/components/NoAuthPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos - Recuperar senha",
  description: "Página de recuperação da senha para estudantes e professores.",
}

const RecoverPassword = () => {
  return (
    <NoAuthPage>
      <ForgotPasswordComponent />
    </NoAuthPage>
  )
}

export default RecoverPassword
