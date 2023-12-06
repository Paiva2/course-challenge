import styled from "styled-components"

export const CoursePageContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BackLink = styled.a`
  display: flex;
  align-items: center;
  background-color: #5a72e0;
  border-radius: 8px;
  color: #fff;
  max-width: fit-content;
  padding: 0.625rem;
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2644cf;
  }
`

export const CoursePageWrapper = styled.div`
  width: 100%;
  max-width: 56.25rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 3.125rem;
  margin-top: 0.9375rem;
  gap: 0.9375rem;
`

export const Card = styled.a`
  text-decoration: none;
  background: #ffffff;
  width: 100%;
  padding: 1.875rem;
  height: 9.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: rgb(245, 245, 245) 9px 13px 9px -6px;
`

export const CourseDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #3f3d3d;

  p {
    color: #898989;
  }
`

export const Title = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 0.625rem;
`

export const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 0.3125rem;
`

export const LaunchDate = styled.p`
  font-size: 0.875rem;
`

export const CourseDuration = styled.p`
  font-size: 0.875rem;
`

export const CourseQuestions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;

  span {
    color: #3f3d3d;
    font-size: 1.125rem;
    font-weight: 700;
  }
`

export const QuestionsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.875rem;
  box-shadow: rgb(245, 245, 245) 9px 13px 9px -6px;
`

export const NewQuestionContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.875rem;
  box-shadow: rgb(245, 245, 245) 9px 13px 9px -6px;
`
