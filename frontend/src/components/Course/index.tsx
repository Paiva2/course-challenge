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

const Course = () => {
  return (
    <Card href="#">
      <CourseDetails>
        <Title>Nome do curso</Title>

        <Description>Descrição do curso</Description>

        <LaunchDate>Data de lançamento</LaunchDate>
      </CourseDetails>

      <CourseQuestions>
        <MessageCircle strokeWidth={0.5} fill="#3f3d3d" color="#3f3d3d" size={21} />
        <span>3</span>
      </CourseQuestions>
    </Card>
  )
}

export default Course
