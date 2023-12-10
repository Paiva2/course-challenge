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
    auth: boolean | undefined
    data: { id: string; name: string; role: string | undefined }
  }
  setUserProfile: Dispatch<
    SetStateAction<{
      token: string
      auth: boolean | undefined
      data: { id: string; name: string; role: string | undefined }
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
    auth: boolean | undefined
    data: { id: string; name: string; role: string | undefined }
  }>({
    token: "",
    auth: undefined,
    data: {
      id: "",
      name: "",
      role: undefined,
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
    setUserProfile((oldValue) => {
      return {
        ...oldValue,
        token: userToken ? userToken : "",
        auth: userToken ? true : false,
        data: {
          ...oldValue.data,
          role: !userToken ? "none" : oldValue.data.role,
        },
      }
    })
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
