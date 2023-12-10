import LoginComponent from "@/components/LoginComponent"
import React from "react"
import NoAuthPage from "@/components/NoAuthPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos - Entrar",
  description: "Página de login.",
}

const Login = () => {
  return (
    <NoAuthPage>
      <LoginComponent />
    </NoAuthPage>
  )
}

export default Login
