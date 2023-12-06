import React, { useContext } from "react"
import { Bar, BarWrapper, LeftSide, LoginLink, RightSide } from "./styles"
import { MonitorPlay } from "lucide-react"
import { CourseContextProvider } from "@/contexts/courseContext"

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
              <span className="loadingQuantity" />
            ) : (
              queryCourses?.data?.totalCourses
            )}{" "}
            Cursos disponíveis
          </p>
        </RightSide>

        <LeftSide>
          <LoginLink href="/entrar">Entrar</LoginLink>
        </LeftSide>
      </BarWrapper>
    </Bar>
  )
}

export default ControlBar
