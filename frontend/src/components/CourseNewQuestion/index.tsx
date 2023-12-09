import React, { FormEvent, useContext, useRef, useState } from "react"
import { AxiosError } from "axios"
import { useQueryClient } from "react-query"
import { UserContextProvider } from "@/contexts/userContext"
import api from "@/lib/api"
import * as S from "./styles"

const CourseNewQuestion = ({ courseId }: { courseId: string }) => {
  const { userProfile } = useContext(UserContextProvider)

  const queryClient = useQueryClient()

  const questionRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement)

  const [newQuestionSubmitting, setNewQuestionSubmitting] = useState(false)
  const [newQuestionError, setNewQuestionError] = useState("")
  const [newQuestionSuccess, setNewQuestionSuccess] = useState("")

  async function handleSubmitNewQuestion(e: FormEvent) {
    e.preventDefault()

    if (questionRef.current.value.length < 10) {
      return setNewQuestionError("A questão precisa ter pelo menos 10 caracteres.")
    }

    setNewQuestionSubmitting(true)

    setNewQuestionError("")
    setNewQuestionSuccess("")

    try {
      const newQuestion = await api.post(
        "/question",
        {
          content: questionRef?.current?.value,
          courseId: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${userProfile.token}`,
          },
        }
      )

      if (newQuestion.status === 201) {
        setNewQuestionSuccess(newQuestion.data.message)

        questionRef.current!.value = ""

        queryClient.invalidateQueries("queryCoursePage")

        setTimeout(() => setNewQuestionSuccess(""), 4200)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setNewQuestionError(e.response?.data.message)

        setTimeout(() => setNewQuestionError(""), 4200)
      }
    } finally {
      setNewQuestionSubmitting(false)
    }
  }

  return (
    <S.NewQuestionContainer onSubmit={handleSubmitNewQuestion}>
      <h1>Adicionar nova pergunta</h1>

      <textarea
        ref={questionRef}
        disabled={!userProfile.auth}
        maxLength={500}
        placeholder="Escreva sua pergunta aqui..."
      />

      {newQuestionSuccess && (
        <S.ApiSuccess>
          <p>{newQuestionSuccess}</p>
        </S.ApiSuccess>
      )}

      {newQuestionError && (
        <S.ApiError>
          <p>{newQuestionError}</p>
        </S.ApiError>
      )}

      <S.SendQuestionButton
        disabled={!userProfile.auth || newQuestionSubmitting}
        type="submit"
      >
        {userProfile.auth ? "Enviar" : "Você precisa entrar para perguntar."}
      </S.SendQuestionButton>
    </S.NewQuestionContainer>
  )
}

export default CourseNewQuestion
