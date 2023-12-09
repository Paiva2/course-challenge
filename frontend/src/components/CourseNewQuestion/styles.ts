import styled from "styled-components"

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
    height: 9.375rem;
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
