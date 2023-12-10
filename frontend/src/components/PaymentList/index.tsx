import React from "react"
import AuthPage from "../AuthPage"

const PaymentList = () => {
  return (
    <AuthPage validRoles={["admin"]}>
      <h1>Pagamentos</h1>
    </AuthPage>
  )
}

export default PaymentList
