import React from "react"
import { ListContainer, ListWrapper } from "./styles"
import Course from "../Course"

const CoursesList = () => {
  return (
    <ListContainer>
      <ListWrapper>
        <Course />
        <Course />
        <Course />
        <Course />
      </ListWrapper>
    </ListContainer>
  )
}

export default CoursesList
