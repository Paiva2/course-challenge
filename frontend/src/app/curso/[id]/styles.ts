import styled from "styled-components"

export const TopSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    gap: 0.3125rem;
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
  }

  @media (max-width: 768px) {
    flex-direction: column;

    a {
      max-width: 100%;
      width: 100%;
      border-radius: 0;
      height: 3.75rem;
      justify-content: center;

      &:not(:first-child) {
        border-top: 1px solid #f6f6f7;
      }
    }
  }
`

export const CoursePageContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3.125rem;
`

export const CoursePageWrapper = styled.div`
  width: 100%;
  max-width: 56.25rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.9375rem;
  padding-top: 3.125rem;
  margin-top: 0.9375rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.9375rem;

  @media (max-width: 768px) {
    padding: 0.625rem;
  }
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

  @media (max-width: 768px) {
    p {
      font-size: 0.875rem;
    }
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

  @media (max-width: 768px) {
    align-items: initial;
    height: 100%;

    span {
      font-size: 0.875rem;
    }
  }
`

export const QuestionsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.875rem;
  padding-bottom: 0;
  box-shadow: rgb(245, 245, 245) 9px 13px 9px -6px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  p {
    word-break: break-word;
  }

  h1 {
    font-size: 1.25rem;
    color: #3f3d3d;
  }
`

export const QuestionPlaceholder = styled.div`
  height: 18.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;

  h1 {
    font-size: 1.25rem;
    color: #3f3d3d;
  }
`
