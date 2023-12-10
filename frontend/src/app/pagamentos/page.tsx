import AuthPage from "@/components/AuthPage"
import PaymentList from "@/components/PaymentList"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Administração - Pagamentos",
  description: "Página de pagamentos para professores.",
}

const Payments = () => {
  return (
    <AuthPage validRoles={["admin"]}>
      <PaymentList />
    </AuthPage>
  )
}

export default Payments
