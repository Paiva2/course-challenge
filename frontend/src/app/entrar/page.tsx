import LoginComponent from "@/components/LoginComponent"
import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos - Entrar",
  description: "Página de login.",
}

const Login = () => {
  return <LoginComponent />
}

export default Login
