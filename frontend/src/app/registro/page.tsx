import React from "react"
import RegisterComponent from "@/components/RegisterModal"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos - Registar",
  description: "Página de registro de novos estudantes e professores.",
}

const Register = () => {
  return <RegisterComponent />
}

export default Register
