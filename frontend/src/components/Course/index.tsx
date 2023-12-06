import React from "react"
import { MessageCircle } from "lucide-react"
import {
  Card,
  CourseDetails,
  CourseQuestions,
  Description,
  LaunchDate,
  Title,
} from "./styles"
import { ICourse } from "@/@types/types"

interface ICourseProps {
  course: ICourse
}

const Course = ({ course }: ICourseProps) => {
  return (
    <Card href={`/course/${course.id}`}>
      <CourseDetails>
        <Title>{course.title}</Title>

        <Description>Descrição: {course.description}</Description>

        <LaunchDate>
          Data de lançamento: {new Date(course.createdAt).toLocaleDateString()}
        </LaunchDate>
      </CourseDetails>

      <CourseQuestions>
        <MessageCircle strokeWidth={0.5} fill="#3f3d3d" color="#3f3d3d" size={21} />
        <span>{course.questions?.length}</span>
      </CourseQuestions>
    </Card>
  )
}

export default Course
