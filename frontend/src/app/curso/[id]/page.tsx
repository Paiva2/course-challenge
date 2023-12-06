"use client"

import React, { useEffect, Fragment } from "react"
import { MessageCircle, ChevronLeft } from "lucide-react"
import { useQuery, UseMutationResult } from "react-query"
import { IAnswer, IQuestion } from "@/@types/types"
import secondsToHours from "@/utils/secondToHours"
import api from "@/lib/api"
import * as S from "./styles"

interface TQueryCourse extends Omit<UseMutationResult, "data"> {
  data: {
    title: string
    updatedAt: string
    active: boolean
    createdAt: string
    description: string
    duration: number
    fkProfessor: string
    id: string

    questions: {
      question: IQuestion
      answers: IAnswer[]
    }[]
  }
}

const CoursePage = ({ params }: { params: { id: string } }) => {
  const courseId = params.id

  const queryCourse = useQuery({
    queryKey: ["queryCoursePage"],
    queryFn: async () => {
      const getCourseDetails = await api.get(`/course/${courseId}`)

      return getCourseDetails.data
    },
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

  if (
    queryCourse?.isLoading ||
    queryCourseProfessor?.isLoading ||
    !queryCourse ||
    !queryCourseProfessor
  )
    return <S.LoadingState />

  return (
    <S.CoursePageContainer>
      <S.CoursePageWrapper>
        <S.TopSide>
          <S.BackLink href="/">
            <ChevronLeft size={20} color="#fff" />
            Voltar
          </S.BackLink>
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
                <S.Question key={questionInfos.question.id}>
                  <S.QuestionContent>
                    {!questionInfos.answers.length ? (
                      <S.AnswerQuestionButton type="button">
                        Responder
                      </S.AnswerQuestionButton>
                    ) : (
                      <S.AnswerQuestionButton disabled type="button">
                        Respondido
                      </S.AnswerQuestionButton>
                    )}

                    <p>Nome do estudante: X</p>
                    <p>Dúvida: {questionInfos.question.question}</p>

                    <p>
                      Feita em:{" "}
                      {new Date(
                        questionInfos.question.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </S.QuestionContent>

                  <Fragment>
                    {questionInfos.answers.map((answer) => {
                      return (
                        <S.Answer key={answer.id}>
                          <p>Professor: Y</p>

                          <p>Resposta: {answer.answer}</p>

                          <p>
                            Respondida em:{" "}
                            {new Date(answer.createdAt).toLocaleDateString()}
                          </p>
                        </S.Answer>
                      )
                    })}
                  </Fragment>
                </S.Question>
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

        <S.NewQuestionContainer>
          <h1>Adicionar nova pergunta</h1>

          <textarea maxLength={500} placeholder="Escreva sua pergunta aqui..." />

          <S.SendQuestionButton type="button">Enviar</S.SendQuestionButton>
        </S.NewQuestionContainer>
      </S.CoursePageWrapper>
    </S.CoursePageContainer>
  )
}

export default CoursePage
