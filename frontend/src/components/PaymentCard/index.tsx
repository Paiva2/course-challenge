"use client"

import React, { useContext, useState } from "react"
import * as S from "./styles"
import currencyFormatter from "@/utils/currencyFormatter"
import { Check, X } from "lucide-react"
import api from "@/lib/api"
import { useQueryClient } from "react-query"
import { UserContextProvider } from "@/contexts/userContext"
import { TQueryPayments } from "@/@types/types"
import { AxiosError } from "axios"

interface IPaymentCard {
  item: {
    createdAt: string
    fkProfessor: string
    id: string
    reason: string
    value: string
  }

  typeShowing: string
  listMutation: TQueryPayments
}

const PaymentCard = ({ item, typeShowing, listMutation }: IPaymentCard) => {
  const [processingAction, setProcessingAction] = useState(false)
  const [actionError, setActionError] = useState("")

  const { userProfile } = useContext(UserContextProvider)

  async function handleApprovePayment(professorId: string, paymentId: string) {
    setProcessingAction(true)

    try {
      const processPayment = await api.post(
        "/finish-payment",
        {
          professorId: professorId,
          pendingPaymentId: paymentId,
        },
        {
          headers: {
            Authorization: `Bearer ${userProfile.token}`,
          },
        }
      )

      if (processPayment.status === 200) {
        listMutation.mutate({})
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setActionError(e.response?.data.message)
      }
    } finally {
      setProcessingAction(false)
    }
  }

  return (
    <S.ListItem>
      <S.ItemContent>
        <span>
          <strong>Data de Criação:</strong>
          {new Date(item.createdAt).toLocaleDateString()}
        </span>

        <span>
          <strong>ID:</strong> {item.id}
        </span>

        <span>
          <strong>ID do Professor:</strong> {item.fkProfessor}
        </span>

        <span>
          <strong>Motivo:</strong>{" "}
          {item.reason === "course" ? "Curso" : "Questão respondida"}
        </span>

        <span>
          <strong>Valor:</strong> {currencyFormatter(+item.value)}
        </span>
      </S.ItemContent>

      <S.ControlButtons>
        {typeShowing === "pending" ? (
          <>
            <S.ActionButton
              disabled={processingAction}
              onClick={() => handleApprovePayment(item.fkProfessor, item.id)}
              $type="pay"
              type="button"
            >
              <Check color="#fff" size={20} />
            </S.ActionButton>
          </>
        ) : (
          <S.PaidButton>Pago</S.PaidButton>
        )}
      </S.ControlButtons>
    </S.ListItem>
  )
}

export default PaymentCard
