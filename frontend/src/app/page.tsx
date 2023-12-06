import HomeWrapper from "@/components/HomeWrapper"
import { Fragment } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos - Página Principal",
  description: "Página principal de cursos disponíveis.",
}

export default function Home() {
  return (
    <Fragment>
      <HomeWrapper />
    </Fragment>
  )
}
