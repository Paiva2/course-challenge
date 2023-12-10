"use client"

import React, { useContext, useEffect, useState } from "react"
import { CourseContextProvider } from "@/contexts/courseContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import EmptyCoursesListPlaceholder from "../EmptyCoursesListPlaceholder"
import LoadingPage from "../LoadingPage"
import Course from "../Course"
import * as S from "./styles"

const CoursesList = () => {
  const { pageNumber, queryCourses, setPageNumber } =
    useContext(CourseContextProvider)

  const [listLoading, setListLoading] = useState(true)

  const isCoursesLoading = queryCourses.isLoading || queryCourses.isError

  useEffect(() => {
    setListLoading(false)
  }, [])

  if (isCoursesLoading || listLoading) {
    return <LoadingPage />
  }

  return (
    <S.ListContainer>
      <S.ListWrapper>
        {queryCourses?.data?.courses.length ? (
          queryCourses?.data?.courses.map((course) => {
            return <Course course={course} key={course.id} />
          })
        ) : (
          <EmptyCoursesListPlaceholder />
        )}
      </S.ListWrapper>

      {!isCoursesLoading && queryCourses?.data?.courses.length > 0 && (
        <S.PaginationWrapper>
          <button
            disabled={+pageNumber <= 1}
            onClick={() => setPageNumber((oldPage) => String(+oldPage - 1))}
            type="button"
          >
            <ChevronLeft size={20} color="#fff" />
          </button>

          {Array.from({
            length: queryCourses?.data?.totalPages,
          }).map((_, page) => (
            <S.PageNumber
              $highlight={String(page + 1) === pageNumber}
              key={page}
              onClick={() => setPageNumber(String(page + 1))}
              type="button"
            >
              {page + 1}
            </S.PageNumber>
          ))}

          <button
            disabled={+pageNumber >= queryCourses?.data?.totalPages}
            onClick={() => setPageNumber((oldPage) => String(+oldPage + 1))}
            type="button"
          >
            <ChevronRight size={20} color="#fff" />
          </button>
        </S.PaginationWrapper>
      )}
    </S.ListContainer>
  )
}

export default CoursesList
