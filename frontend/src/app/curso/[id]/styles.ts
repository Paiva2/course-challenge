import styled, { keyframes } from "styled-components"

export const TopSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const CoursePageContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3.125rem;
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

const rotateLoading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export const LoadingState = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  border: 6px solid #e9e9e9;
  border-top: 6px #5a3ce8 solid;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  -webkit-animation: ${rotateLoading} 1s linear infinite;
  animation: ${rotateLoading} 1s linear infinite;
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
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

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

export const Question = styled.div`
  position: relative;
  padding-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-bottom: 1px solid #e1e1e1;
`

export const AnswerQuestionButton = styled.button`
  position: absolute;
  right: 0;
  color: #5a72e0;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  font-size: 0.875rem;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover {
    color: #2644cf;
  }
`

export const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    max-width: 90%;
    word-break: normal;
  }
`

export const Answer = styled.div`
  padding-left: 1.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  p {
    max-width: 90%;
    word-break: normal;
  }
`

export const NewQuestionContainer = styled.form`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.875rem;
  box-shadow: rgb(245, 245, 245) 9px 13px 9px -6px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h1 {
    font-size: 1.25rem;
    color: #3f3d3d;
  }

  textarea {
    resize: none;
    outline: none;
    height: 150px;
    padding: 0.9375rem;
    font-size: 1rem;
    background-color: #f7f8fd;
    border: 0;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #898989;
      font-size: 1rem;
    }
  }
`

export const SendQuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: start;
  color: #fff;
  background-color: #5a72e0;
  border-radius: 10px;
  padding: 0.75rem 1.875rem;
  transition: all 0.2s ease-in-out;
  font-weight: 600;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background-color: #2644cf;
  }
`

export const ApiError = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #e53333;
  font-weight: 600;
`

export const ApiSuccess = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #32a13a;
  font-weight: 600;
`
