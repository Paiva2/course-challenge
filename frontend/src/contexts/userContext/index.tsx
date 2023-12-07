import React, {
  createContext,
  useState,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "react-query"
import { jwtDecode } from "jwt-decode"
import { IToken } from "@/@types/types"
import Cookies from "js-cookie"
import api from "@/lib/api"

interface UserContextProviderProps {
  children: React.ReactNode
}

interface UserContextInterface {
  userProfile: {
    token: string
    auth: boolean
    data: { id: string; name: string; role: string }
  }
  setUserProfile: Dispatch<
    SetStateAction<{
      token: string
      auth: boolean
      data: { id: string; name: string; role: string }
    }>
  >
}

export const UserContextProvider = createContext<UserContextInterface>(
  {} as UserContextInterface
)

const UserContext = ({ children }: UserContextProviderProps) => {
  const pathname = usePathname()

  const [userProfile, setUserProfile] = useState<{
    token: string
    auth: boolean
    data: { id: string; name: string; role: string }
  }>({
    token: "",
    auth: false,
    data: {
      id: "",
      name: "",
      role: "",
    },
  })

  const userToken = Cookies.get("cursos-auth")

  useQuery({
    queryKey: ["fetchUser"],
    queryFn: async () => {
      const decodeToken = jwtDecode(userToken as string) as IToken

      const fetchUser = await api.get(`user/${decodeToken.data.id}`)

      setUserProfile((oldValue) => {
        return {
          ...oldValue,
          data: fetchUser.data.data,
        }
      })

      return fetchUser.data
    },
    enabled: Boolean(userToken),
  })

  useLayoutEffect(() => {
    if (userToken) {
      setUserProfile((oldValue) => {
        return {
          ...oldValue,
          token: userToken,
          auth: true,
        }
      })
    }
  }, [pathname.toString()])

  return (
    <UserContextProvider.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  )
}

export default UserContext
