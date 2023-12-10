"use client"

import React, { useContext, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { UserContextProvider } from "@/contexts/userContext"
import { ChevronLeft, ChevronRight, Receipt } from "lucide-react"
import { TQueryPayments } from "@/@types/types"
import LoadingPage from "../LoadingPage"
import PaymentCard from "../PaymentCard"
import api from "@/lib/api"
import * as S from "./styles"

const paymentTypesAvailable = [
  {
    title: "Pendentes",
    typeName: "pending",
  },
  {
    title: "Finalizados",
    typeName: "finished",
  },
]

const PaymentList = () => {
  const { userProfile } = useContext(UserContextProvider)

  const [page, setPage] = useState(1)
  const [paymentType, setPaymentType] = useState("pending")

  const listMutation = useMutation({
    mutationKey: ["fetchPaymentList"],
    mutationFn: async () => {
      const listData = await api.get(`/payments?type=${paymentType}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${userProfile.token}`,
        },
      })

      return listData.data
    },
  }) as TQueryPayments

  useEffect(() => {
    if (userProfile.token) {
      listMutation.mutate({})
    }
  }, [page, paymentType, userProfile.token])

  useEffect(() => {
    setPage(1)
  }, [paymentType])

  if (!listMutation.data || listMutation.isLoading) return <LoadingPage />

  return (
    <S.PaymentListContainer>
      <S.BackLink href="/">
        <ChevronLeft size={20} color="#fff" />
        Voltar
      </S.BackLink>
      <div>
        <S.Title>Pagamentos</S.Title>
      </div>

      <S.PaymentListWrapper>
        <S.ListControl>
          {paymentTypesAvailable.map((type) => {
            return (
              <S.ControlButton
                disabled={listMutation.isLoading}
                $hightlight={paymentType === type.typeName}
                onClick={() => setPaymentType(type.typeName)}
                key={type.title}
                type="button"
              >
                {type.title}
              </S.ControlButton>
            )
          })}
        </S.ListControl>

        <S.ListItems>
          {listMutation.data.payments.length > 0 ? (
            listMutation.data.payments.map((item) => {
              return (
                <PaymentCard
                  listMutation={listMutation}
                  typeShowing={paymentType}
                  key={item.id}
                  item={item}
                />
              )
            })
          ) : (
            <S.Placeholder>
              <h1>Nenhum pagamento para exibir...</h1>
              <Receipt size={50} color="#2b822b" />
            </S.Placeholder>
          )}
        </S.ListItems>

        {listMutation.data.payments.length > 0 && (
          <S.PaginationWrapper>
            <button
              disabled={+page <= 1}
              onClick={() => setPage((oldPage) => +oldPage - 1)}
              type="button"
            >
              <ChevronLeft size={20} color="#fff" />
            </button>

            {Array.from({
              length: listMutation?.data?.totalPages,
            }).map((_, pageNumber) => (
              <S.PageNumber
                $highlight={page === pageNumber + 1}
                key={pageNumber}
                onClick={() => setPage(pageNumber + 1)}
                type="button"
              >
                {pageNumber + 1}
              </S.PageNumber>
            ))}

            <button
              disabled={+page >= listMutation?.data?.totalPages}
              onClick={() => setPage((oldPage) => +oldPage + 1)}
              type="button"
            >
              <ChevronRight size={20} color="#fff" />
            </button>
          </S.PaginationWrapper>
        )}
      </S.PaymentListWrapper>
    </S.PaymentListContainer>
  )
}

export default PaymentList
