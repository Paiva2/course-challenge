import EditCourse from "@/components/EditCourse"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Cursos - Editando",
  description: "Página de edição de curso.",
}

const EditCoursePage = ({ params }: { params?: { id: string } }) => {
  return <EditCourse params={params} />
}

export default EditCoursePage
