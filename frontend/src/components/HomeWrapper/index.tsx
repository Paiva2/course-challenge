"use client"

import React from "react"
import ControlBar from "../ControlBar"
import { HomeContainer, Wrapper } from "./styles"
import CoursesList from "../CoursesList"

const HomeWrapper = () => {
  return (
    <HomeContainer>
      <Wrapper>
        <ControlBar />
        <CoursesList />
      </Wrapper>
    </HomeContainer>
  )
}

export default HomeWrapper
