import React from "react"
import secondsToHours from "@/utils/secondToHours"
import { MessageCircle } from "lucide-react"
import { ICourse } from "@/@types/types"
import * as S from "./styles"

interface ICourseProps {
  course: ICourse
}

const Course = ({ course }: ICourseProps) => {
  return (
    <S.Card href={`/curso/${course.id}`}>
      <S.CourseDetails>
        <S.Title>{course.title}</S.Title>

        <S.Description>Descrição: {course.description}</S.Description>

        <S.LaunchDate>
          Data de lançamento: {new Date(course.createdAt).toLocaleDateString()}
        </S.LaunchDate>

        <S.CourseDuration>
          Duração: {secondsToHours(course.duration)}
        </S.CourseDuration>
      </S.CourseDetails>

      <S.CourseQuestions>
        <MessageCircle strokeWidth={0.5} fill="#3f3d3d" color="#3f3d3d" size={21} />
        <span>{course.questions?.length}</span>
      </S.CourseQuestions>
    </S.Card>
  )
}

export default Course
