import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
} from "react"
import { ChevronLeft, RefreshCcw } from "lucide-react"
import { UserContextProvider } from "@/contexts/userContext"
import { useQuery, useQueryClient } from "react-query"
import api from "@/lib/api"
import currencyFormatter from "@/utils/currencyFormatter"
import * as S from "./styles"

interface IBalanceModal {
  openBalanceModal: boolean
  setOpenBalanceModal: Dispatch<SetStateAction<boolean>>
}

const BalanceModal = ({ openBalanceModal, setOpenBalanceModal }: IBalanceModal) => {
  const { userProfile } = useContext(UserContextProvider)
  const [refreshing, setRefreshing] = useState(false)

  const queryClient = useQueryClient()

  const balanceInfos = useQuery({
    queryKey: ["fetchPersonalBalance"],
    queryFn: async () => {
      setRefreshing(true)

      const fetchUser = await api.get(`my-balance`, {
        headers: {
          Authorization: `Bearer ${userProfile.token}`,
        },
      })

      return fetchUser.data
    },

    retry: 1,
    onSuccess: () => setRefreshing(false),
  })

  function reloadBalance() {
    queryClient.invalidateQueries("fetchPersonalBalance")
  }

  return (
    <S.BalanceOverlay
      onClick={() => setOpenBalanceModal(false)}
      $openOverlay={openBalanceModal}
    >
      <S.BalanceContainer onClick={(e) => e.stopPropagation()}>
        <S.RefreshButton
          $refreshing={refreshing || balanceInfos.isLoading}
          onClick={reloadBalance}
          type="button"
        >
          <RefreshCcw className="refreshIcon" color="#fff" size={20} />
        </S.RefreshButton>
        <S.BalanceTitle>Balanço total</S.BalanceTitle>

        <S.BalanceContent>
          {refreshing || balanceInfos.isLoading ? (
            <span className="loadingBalance" />
          ) : (
            <Fragment>
              <p>
                <strong>Pendente:</strong>{" "}
                {currencyFormatter(balanceInfos.data.pendingTotal)}
              </p>
              <p>
                <strong>Total recebido até o momento:</strong>{" "}
                {currencyFormatter(balanceInfos.data.receivedTotal)}
              </p>
              <p>
                <strong>Total disponível:</strong>{" "}
                {currencyFormatter(balanceInfos.data.walletTotal)}
              </p>
            </Fragment>
          )}
        </S.BalanceContent>

        <S.BackButton type="button" onClick={() => setOpenBalanceModal(false)}>
          <ChevronLeft color="#fff" size={25} />
        </S.BackButton>
      </S.BalanceContainer>
    </S.BalanceOverlay>
  )
}

export default BalanceModal
