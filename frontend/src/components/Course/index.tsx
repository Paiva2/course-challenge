import React from "react"
import { MessageCircle } from "lucide-react"
import {
  Card,
  CourseDetails,
  CourseDuration,
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
  function secondsToHours(seconds: number) {
    let courseTime = ""

    const hours = seconds / 3600

    const hoursFixed = hours.toFixed(2)

    const splitHours = hoursFixed.split(".")

    if (splitHours.length > 0) {
      courseTime = `${splitHours[0]}h ${splitHours[1]}m`
    }

    if (splitHours[1] === "00") {
      courseTime = `${splitHours[0]}h`
    }

    return courseTime
  }

  return (
    <Card href={`/curso/${course.id}`}>
      <CourseDetails>
        <Title>{course.title}</Title>

        <Description>Descrição: {course.description}</Description>

        <LaunchDate>
          Data de lançamento: {new Date(course.createdAt).toLocaleDateString()}
        </LaunchDate>

        <CourseDuration>Duração: {secondsToHours(course.duration)}</CourseDuration>
      </CourseDetails>

      <CourseQuestions>
        <MessageCircle strokeWidth={0.5} fill="#3f3d3d" color="#3f3d3d" size={21} />
        <span>{course.questions?.length}</span>
      </CourseQuestions>
    </Card>
  )
}

export default Course
