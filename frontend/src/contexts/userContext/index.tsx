import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { useMutation, UseMutationResult } from "react-query"
import { ICourseSchema } from "@/@types/types"
import api from "../../lib/api"

interface UserContextProviderProps {
  children: React.ReactNode
}

interface UserContextInterface {}

export const UserContextProvider = createContext<UserContextInterface>(
  {} as UserContextInterface
)

const UserContext = ({ children }: UserContextProviderProps) => {
  return (
    <UserContextProvider.Provider value={{}}>
      {children}
    </UserContextProvider.Provider>
  )
}

export default UserContext
