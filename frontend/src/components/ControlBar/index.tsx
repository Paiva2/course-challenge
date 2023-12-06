import React, { useContext } from "react"
import { Bar, BarWrapper, LeftSide, LoginLink, RightSide } from "./styles"
import { MonitorPlay } from "lucide-react"
import { CourseContextProvider } from "@/courseContext"

const ControlBar = () => {
  const { queryCourses } = useContext(CourseContextProvider)

  return (
    <Bar>
      <BarWrapper>
        <RightSide>
          <span>
            <MonitorPlay size={30} color="#fff" />
          </span>

          <p>
            {queryCourses.isLoading || queryCourses.isError ? (
              <div className="loadingQuantity" />
            ) : (
              queryCourses?.data?.totalPages * 10
            )}{" "}
            Cursos disponíveis
          </p>
        </RightSide>

        <LeftSide>
          <LoginLink>Entrar</LoginLink>
        </LeftSide>
      </BarWrapper>
    </Bar>
  )
}

export default ControlBar
