import NewCourseForm from "@/components/NewCourseForm"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Cursos - Novo",
  description: "Página de criação de novo curso.",
}

const NewCourse = () => {
  return <NewCourseForm />
}

export default NewCourse
