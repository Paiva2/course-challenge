"use client"

import React, { useContext } from "react"
import { CourseContextProvider } from "@/contexts/courseContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Course from "../Course"
import * as S from "./styles"

const CoursesList = () => {
  const { pageNumber, queryCourses, setPageNumber } =
    useContext(CourseContextProvider)

  const isCoursesLoading = queryCourses.isLoading || queryCourses.isError

  return (
    <S.ListContainer>
      <S.ListWrapper>
        {isCoursesLoading ? (
          <S.LoadingWrapper>
            <div className="loadingCourses" />
          </S.LoadingWrapper>
        ) : (
          <>
            {queryCourses?.data?.courses.map((course) => {
              return <Course course={course} key={course.id} />
            })}
          </>
        )}
      </S.ListWrapper>

      {!isCoursesLoading && (
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
            <button
              key={page}
              onClick={() => setPageNumber(String(page + 1))}
              type="button"
            >
              {page + 1}
            </button>
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
