"use client"

import React, { FormEvent, useEffect, useRef, useState, useContext } from "react"
import { ChevronLeft } from "lucide-react"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { TQueryCourse } from "@/@types/types"
import { useQuery, useQueryClient } from "react-query"
import { UserContextProvider } from "@/contexts/userContext"
import api from "@/lib/api"
import * as S from "./styles"

interface IEditCourseProps {
  params: { id: string } | undefined
}

interface IEditCourseRequest {
  title?: string
  description?: string
  active?: boolean
}

interface IFormErrors {
  title: string
  description: string
  confirmPassword: string
}

const defaultFormFields = {
  title: "",
  description: "",
}

const EditCourse = ({ params }: IEditCourseProps) => {
  const { userProfile } = useContext(UserContextProvider)
  const router = useRouter()

  const queryClient = useQueryClient()
  const courseId = params?.id

  const activeCourseRef = useRef<HTMLInputElement>({} as HTMLInputElement)

  const [formFields, setFormFields] = useState(defaultFormFields)
  const [formErrors, setFormErrors] = useState({} as IFormErrors)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [apiSuccess, setApiSuccess] = useState("")
  const [apiErrors, setApiErrors] = useState("")

  const queryCourse = useQuery({
    queryKey: ["queryCourseEditPage"],
    queryFn: async () => {
      const getCourseDetails = await api.get(`/course/${courseId}`)

      return getCourseDetails.data
    },

    onSuccess: (courseData) => {
      setFormFields((oldValues) => {
        return {
          ...oldValues,
          title: courseData.title,
          description: courseData.description,
        }
      })
    },

    enabled: Boolean(courseId),
  }) as unknown as TQueryCourse

  function handleEditFieldValues(field: string, value: string) {
    setFormFields((oldValue) => {
      return {
        ...oldValue,
        [field]: value,
      }
    })
  }

  async function submitInformations() {
    const { title, description } = formFields

    const fieldsToUpdate: IEditCourseRequest = {
      title,
      description,
      active: activeCourseRef.current.checked,
    }

    if (title === queryCourse.data.title || !title) {
      delete fieldsToUpdate.title
    } else if (description === queryCourse.data.description || !description) {
      delete fieldsToUpdate.description
    }

    try {
      const submitEdit = await api.patch(
        "/course",
        {
          courseId: queryCourse.data.id,
          fieldsToUpdate,
        },
        {
          headers: {
            Authorization: `Bearer ${userProfile.token}`,
          },
        }
      )

      if (submitEdit.status === 200) {
        setApiSuccess(submitEdit.data.message)

        queryClient.invalidateQueries("queryCourseEditPage")
        queryClient.invalidateQueries("queryCoursePage")
        queryClient.invalidateQueries("fetchCourses")

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

    if (formFields.title && formFields.title.length < 5) {
      errors.title = "O título precisa ter pelo menos 5 caracteres"
    }

    if (formFields.description && formFields.description.length < 6) {
      errors.description = "A descrição precisa ter pelo menos 10 caracteres"
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

  if (queryCourse?.isLoading || !queryCourse) {
    return <S.LoadingState />
  }

  return (
    <S.EditCourseContainer>
      <S.EditCourseWrapper>
        <S.EditCourseForm onSubmit={handleInitSubmit}>
          <S.EditCourseFormTitle>
            <h1>Editar curso</h1>

            <p>Edite as informações do curso preenchendo o formulário.</p>
          </S.EditCourseFormTitle>

          <S.EditCourseFields>
            <S.FormLabel $isError={false}>
              Título
              <input
                value={formFields.title}
                onChange={({ target }) =>
                  handleEditFieldValues("title", target.value)
                }
                placeholder="Título do curso"
                type="text"
              />
              {formErrors.title && (
                <p className="validationError">{formErrors.title}</p>
              )}
            </S.FormLabel>

            <S.FormLabel $isError={false}>
              Descrição do curso
              <textarea
                value={formFields.description}
                maxLength={100}
                onChange={({ target }) =>
                  handleEditFieldValues("description", target.value)
                }
                placeholder="Descrição do curso"
              />
              {formErrors.description && (
                <p className="validationError">{formErrors.description}</p>
              )}
            </S.FormLabel>

            <S.CheckboxLabel>
              Ativo:
              <input
                defaultChecked={queryCourse.data.active}
                ref={activeCourseRef}
                type="checkbox"
              />
            </S.CheckboxLabel>
          </S.EditCourseFields>

          <S.ApiError>{apiErrors && <p>{apiErrors}</p>}</S.ApiError>
          <S.ApiSuccess>{apiSuccess && <p>{apiSuccess}</p>}</S.ApiSuccess>

          <S.EditCourseButton type="submit" disabled={formSubmitting}>
            Confirmar
          </S.EditCourseButton>

          <S.BackButton onClick={() => router.back()}>
            <ChevronLeft color="#fff" size={25} />
          </S.BackButton>
        </S.EditCourseForm>
      </S.EditCourseWrapper>
    </S.EditCourseContainer>
  )
}

export default EditCourse
