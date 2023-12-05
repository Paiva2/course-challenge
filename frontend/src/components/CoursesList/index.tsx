import React from "react"
import Course from "../Course"
import { ListContainer, ListWrapper, PaginationWrapper } from "./styles"

const CoursesList = () => {
  const pages = [1, 2, 3, 4, 5]

  return (
    <ListContainer>
      <ListWrapper>
        <Course />
        <Course />
        <Course />
        <Course />
      </ListWrapper>

      <PaginationWrapper>
        {pages.map((page) => (
          <button type="button">{page}</button>
        ))}
      </PaginationWrapper>
    </ListContainer>
  )
}

export default CoursesList
