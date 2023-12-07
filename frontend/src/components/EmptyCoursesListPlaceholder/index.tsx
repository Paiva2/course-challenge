import { BookDashed } from "lucide-react"
import React from "react"
import * as S from "./styles"

const EmptyCoursesListPlaceholder = () => {
  return (
    <S.EmptyListCoursesContainer>
      <h1>Nenhum curso para exibir...</h1>
      <BookDashed size={60} color="#3f3d3d" />
    </S.EmptyListCoursesContainer>
  )
}

export default EmptyCoursesListPlaceholder
