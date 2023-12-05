"use client"

import React from "react"
import ControlBar from "../ControlBar"
import { HomeContainer, Wrapper } from "./styles"

const HomeWrapper = () => {
  return (
    <HomeContainer>
      <Wrapper>
        <ControlBar />
      </Wrapper>
    </HomeContainer>
  )
}

export default HomeWrapper
