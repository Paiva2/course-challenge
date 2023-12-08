"use client"

import React, { useEffect, useContext, useRef, useState, FormEvent } from "react"
import { MessageCircle, ChevronLeft, Pencil } from "lucide-react"
import { useQuery, useQueryClient } from "react-query"
import { TQueryCourse } from "@/@types/types"
import { UserContextProvider } from "@/contexts/userContext"
import { AxiosError } from "axios"
import secondsToHours from "@/utils/secondToHours"
import QuestionComponent from "@/components/QuestionComponent"
import Link from "next/link"
import api from "@/lib/api"
import * as S from "./styles"

const CoursePage = ({ params }: { params: { id: string } }) => {
  const { userProfile } = useContext(UserContextProvider)

  const queryClient = useQueryClient()

  const courseId = params.id

  const questionRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement)

  const [newQuestionSubmitting, setNewQuestionSubmitting] = useState(false)
  const [newQuestionError, setNewQuestionError] = useState("")
  const [newQuestionSuccess, setNewQuestionSuccess] = useState("")

  const queryCourse = useQuery({
    queryKey: ["queryCoursePage"],
    queryFn: async () => {
      const getCourseDetails = await api.get(`/course/${courseId}`)

      return getCourseDetails.data
    },
    enabled: Boolean(courseId),
  }) as unknown as TQueryCourse

  const { data: queryCourseProfessor } = useQuery({
    queryKey: ["queryCourseProfessorPage"],
    queryFn: async () => {
      const getProfessorDetails = await api.get(
        `/user/${queryCourse.data.fkProfessor}`
      )

      return getProfessorDetails.data
    },
    enabled: Boolean(queryCourse?.data?.fkProfessor),
  })

  useEffect(() => {
    if (queryCourse?.data?.title) {
      window.document.title = `Curso: ${queryCourse.data.title}`
    }
  }, [queryCourse?.data])

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

  if (
    queryCourse?.isLoading ||
    queryCourseProfessor?.isLoading ||
    !queryCourse ||
    !queryCourseProfessor
  )
    return <S.LoadingState />

  const doesIOwnThisCourse =
    queryCourse.data.fkProfessor === userProfile.data.id &&
    userProfile.data.role === "professor"

  return (
    <S.CoursePageContainer>
      <S.CoursePageWrapper>
        <S.TopSide>
          <a href="/">
            <ChevronLeft size={20} color="#fff" />
            Voltar
          </a>

          {doesIOwnThisCourse && (
            <Link href={`/curso/editar/${queryCourse.data.id}`} type="button">
              <Pencil size={15} color="#fff" /> Editar
            </Link>
          )}
        </S.TopSide>

        <S.Card>
          <S.CourseDetails>
            <S.Title>{queryCourse.data.title}</S.Title>

            <p>Professor: {queryCourseProfessor.data.name}</p>
            <S.Description>Descrição: {queryCourse.data.description}</S.Description>

            <S.LaunchDate>
              Data de lançamento:{" "}
              {new Date(queryCourse.data.createdAt).toLocaleDateString()}
            </S.LaunchDate>

            <S.CourseDuration>
              Duração: {secondsToHours(queryCourse.data.duration)}
            </S.CourseDuration>
          </S.CourseDetails>

          <S.CourseQuestions>
            <MessageCircle
              strokeWidth={0.5}
              fill="#3f3d3d"
              color="#3f3d3d"
              size={21}
            />
            <span>{queryCourse.data.questions?.length}</span>
          </S.CourseQuestions>
        </S.Card>

        <S.QuestionsContainer>
          <h1>Perguntas</h1>
          {queryCourse.data.questions.length ? (
            queryCourse.data.questions.map((questionInfos) => {
              return (
                <QuestionComponent
                  key={questionInfos.question.id}
                  canAnswer={doesIOwnThisCourse}
                  questionInfos={questionInfos}
                />
              )
            })
          ) : (
            <S.QuestionPlaceholder>
              <h1>Faça a primeira pergunta!</h1>
              <span>
                <MessageCircle size={50} strokeWidth={0.7} />
              </span>
            </S.QuestionPlaceholder>
          )}
        </S.QuestionsContainer>

        {queryCourse.data.fkProfessor !== userProfile.data.id && (
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
        )}
      </S.CoursePageWrapper>
    </S.CoursePageContainer>
  )
}

export default CoursePage
