"use client"

import React, { useState, useRef, FormEvent, useEffect, useContext } from "react"
import { AxiosError } from "axios"
import { ChevronLeft } from "lucide-react"
import { UserContextProvider } from "@/contexts/userContext"
import api from "@/lib/api"
import formatInputToHours from "@/utils/formatInputToHours"
import * as S from "./styles"

interface IFormErrors {
  duration: string
  title: string
  description: string
}

const NewCourseForm = () => {
  const { userProfile } = useContext(UserContextProvider)

  const titleFieldRef = useRef<HTMLInputElement | null>(null)
  const durationRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const [formErrors, setFormErrors] = useState({} as IFormErrors)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [apiSuccess, setApiSuccess] = useState("")
  const [apiErrors, setApiErrors] = useState("")

  async function submitInformations() {
    const splitDuration = durationRef.current?.value.split(":") ?? ["1", "00"]

    const hours = parseInt(splitDuration[0], 10)
    const minutes = parseInt(splitDuration[1], 10)

    const courseDurationSeconds = hours * 3600 + minutes * 60

    const course = {
      title: titleFieldRef.current?.value,
      duration: +courseDurationSeconds,
      description: descriptionRef.current?.value,
    }

    try {
      const submitNewCourse = await api.post(
        "/course",
        {
          course,
        },
        {
          headers: {
            Authorization: `Bearer ${userProfile.token}`,
          },
        }
      )

      if (submitNewCourse.status === 201) {
        if (titleFieldRef.current && descriptionRef.current && durationRef.current) {
          titleFieldRef.current.value = ""
          descriptionRef.current.value = ""
          durationRef.current.value = "1:00"
        }

        setApiSuccess(submitNewCourse.data.message)

        setTimeout(() => setApiSuccess(""), 4000)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setApiErrors(e.response?.data.message)
      }
    } finally {
      setFormSubmitting(false)
    }
  }

  function checkFormErrors() {
    const errors = {} as IFormErrors

    if (!titleFieldRef.current || !descriptionRef.current || !durationRef.current)
      return

    if (titleFieldRef.current.value.length < 5) {
      errors.title = "O título precisa ter pelo menos 5 caracteres"
    }

    if (descriptionRef.current.value.length < 6) {
      errors.description = "A descrição precisa ter pelo menos 10 caracteres"
    }

    const getCourseHours = durationRef.current.value.split(":")[0]

    if (+getCourseHours < 1) {
      errors.duration = "A duração precisa ser maior do que 1"
    }

    setFormErrors(errors)
  }

  function handleInitSubmit(e: FormEvent) {
    e.preventDefault()

    checkFormErrors()

    setApiErrors("")

    setFormSubmitting(true)
  }

  useEffect(() => {
    const doesFormHasErrors = Object.keys(formErrors)

    if (!doesFormHasErrors.length && formSubmitting) {
      submitInformations()
    } else {
      setFormSubmitting(false)
    }
  }, [formErrors])

  return (
    <S.NewCourseContainer>
      <S.NewCourseWrapper>
        <S.NewCourseForm onSubmit={handleInitSubmit}>
          <S.NewCourseFormTitle>
            <h1>Novo curso</h1>

            <p>Registre um novo curso preenchendo os campos do formulário!</p>
          </S.NewCourseFormTitle>

          <S.NewCourseFields>
            <S.FormLabel $isError={false}>
              Título do curso
              <input
                ref={titleFieldRef}
                placeholder="Digite o título do curso"
                type="text"
              />
              {formErrors.title && (
                <p className="validationError">{formErrors.title}</p>
              )}
            </S.FormLabel>
            <S.FormLabel $isError={false}>
              Duração do curso
              <input
                type="text"
                defaultValue="1:00"
                maxLength={4}
                onChange={(e) => formatInputToHours(e.target)}
                ref={durationRef}
                placeholder="Duração do curso ex: 1:20 (1h e 20m)"
              />
              {formErrors.duration && (
                <p className="validationError">{formErrors.duration}</p>
              )}
            </S.FormLabel>

            <S.FormLabel $isError={false}>
              Descrição do curso
              <textarea
                maxLength={100}
                ref={descriptionRef}
                placeholder="Descrição do curso"
              />
              {formErrors.description && (
                <p className="validationError">{formErrors.description}</p>
              )}
            </S.FormLabel>
          </S.NewCourseFields>

          <S.ApiSuccess>{apiSuccess && <p>{apiSuccess}</p>}</S.ApiSuccess>
          <S.ApiError>{apiErrors && <p>{apiErrors}</p>}</S.ApiError>

          <S.NewCourseButton type="submit" disabled={formSubmitting}>
            Criar
          </S.NewCourseButton>

          <S.BackLink href="/">
            <ChevronLeft color="#fff" size={25} />
          </S.BackLink>
        </S.NewCourseForm>
      </S.NewCourseWrapper>
    </S.NewCourseContainer>
  )
}

export default NewCourseForm
