import React from "react"
import { Bar, BarWrapper, LeftSide, LoginLink, RightSide } from "./styles"
import { MonitorPlay } from "lucide-react"

const ControlBar = () => {
  return (
    <Bar>
      <BarWrapper>
        <RightSide>
          <span>
            <MonitorPlay size={30} color="#fff" />
          </span>

          <p>X Cursos disponíveis</p>
        </RightSide>

        <LeftSide>
          <LoginLink>Entrar</LoginLink>
        </LeftSide>
      </BarWrapper>
    </Bar>
  )
}

export default ControlBar
