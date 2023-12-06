import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { useMutation, UseMutationResult } from "react-query"
import { ICourseSchema } from "@/@types/types"
import api from "../lib/api"

interface TQueryCourses extends Omit<UseMutationResult, "data"> {
  data: ICourseSchema
}

interface CourseContextProviderProps {
  children: React.ReactNode
}

interface CourseContextInterface {
  pageNumber: string
  setPageNumber: Dispatch<SetStateAction<string>>

  queryCourses: TQueryCourses
}

export const CourseContextProvider = createContext<CourseContextInterface>(
  {} as CourseContextInterface
)

const CourseContext = ({ children }: CourseContextProviderProps) => {
  const [pageNumber, setPageNumber] = useState("1")

  const queryCourses = useMutation({
    mutationKey: ["fetchCourses"],
    mutationFn: async (page: string) => {
      const queryCourses = await api.get(`/courses?page=${page ? page : "1"}`)

      return queryCourses.data
    },
  }) as TQueryCourses

  useEffect(() => {
    queryCourses.mutate(pageNumber)
  }, [pageNumber])

  return (
    <CourseContextProvider.Provider
      value={{
        pageNumber,
        queryCourses,
        setPageNumber,
      }}
    >
      {children}
    </CourseContextProvider.Provider>
  )
}

export default CourseContext
