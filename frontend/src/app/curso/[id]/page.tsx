"use client"

import api from "@/lib/api"
import React, { useEffect, Fragment } from "react"
import {
  BackLink,
  Card,
  CourseDetails,
  CourseDuration,
  CoursePageContainer,
  CoursePageWrapper,
  CourseQuestions,
  Description,
  LaunchDate,
  NewQuestionContainer,
  QuestionsContainer,
  Title,
} from "./styles"
import { MessageCircle, ChevronLeft } from "lucide-react"
import { useQuery, UseMutationResult } from "react-query"
import { IAnswer, IQuestion } from "@/@types/types"
import secondsToHours from "@/utils/secondToHours"

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
    return <></>

  return (
    <CoursePageContainer>
      <CoursePageWrapper>
        <div>
          <BackLink href="/">
            <ChevronLeft size={20} color="#fff" />
            Voltar
          </BackLink>
        </div>

        <Card>
          <CourseDetails>
            <Title>{queryCourse.data.title}</Title>

            <p>Professor: {queryCourseProfessor.data.name}</p>
            <Description>Descrição: {queryCourse.data.description}</Description>

            <LaunchDate>
              Data de lançamento:{" "}
              {new Date(queryCourse.data.createdAt).toLocaleDateString()}
            </LaunchDate>

            <CourseDuration>
              Duração: {secondsToHours(queryCourse.data.duration)}
            </CourseDuration>
          </CourseDetails>

          <CourseQuestions>
            <MessageCircle
              strokeWidth={0.5}
              fill="#3f3d3d"
              color="#3f3d3d"
              size={21}
            />
            <span>{queryCourse.data.questions?.length}</span>
          </CourseQuestions>
        </Card>

        <QuestionsContainer>
          <h1>Perguntas</h1>

          <div>
            {queryCourse.data.questions.map((questionInfos) => {
              return (
                <Fragment key={questionInfos.question.id}>
                  <div>
                    <button type="button">Responder</button>
                    <p>
                      Feita em:{" "}
                      {new Date(
                        questionInfos.question.createdAt
                      ).toLocaleDateString()}
                    </p>
                    <p>Nome do estudante: X</p>

                    <p>{questionInfos.question.question}</p>
                  </div>

                  <div>
                    {questionInfos.answers.map((answer) => {
                      return (
                        <div key={answer.id}>
                          <p>
                            Respondida em:{" "}
                            {new Date(answer.createdAt).toLocaleDateString()}
                          </p>
                          <p>Professor: Y</p>

                          <p>{answer.answer}</p>
                        </div>
                      )
                    })}
                  </div>
                </Fragment>
              )
            })}
          </div>
        </QuestionsContainer>

        <NewQuestionContainer>
          <h1>Adicionar nova pergunta</h1>

          <textarea />

          <button type="button">Enviar</button>
        </NewQuestionContainer>
      </CoursePageWrapper>
    </CoursePageContainer>
  )
}

export default CoursePage
