import styled, { keyframes } from "styled-components"

export const EditCourseContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.25rem;

    span {
      font-size: 0.875rem;
    }
  }
`

export const EditCourseWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 34.375rem;
  max-height: 28.125rem;

  a {
    color: #5a72e0;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    max-height: initial;
  }
`

export const EditCourseFormTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h1 {
    font-size: 1.875rem;
    color: #000;
  }

  p {
    font-size: 1rem;
    color: #434343;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }

    p {
      font-size: 0.875rem;
    }
  }
`

export const EditCourseForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  gap: 1.25rem;
  padding: 2.5rem;

  span {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.3125rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.3125rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5625rem;
  }
`

export const EditCourseFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`

export const FormLabel = styled.label<{ $isError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;

  color: ${(props) => (props.$isError ? "#e53333" : "#000")};

  .validationError {
    color: #e53333;
    font-size: 0.875rem;
    margin-top: 0.1875rem;
    font-weight: 500;
  }

  input,
  textarea {
    height: 2.8125rem;
    padding: 0.9375rem;
    border-radius: 8px;
    border: 0;
    background-color: #f7f8fd;
    font-size: 1rem;
    border: 1px solid ${(props) => (props.$isError ? "#e53333" : "none")};
    color: ${(props) => (props.$isError ? "#e53333" : "#000")};

    &::placeholder {
      color: ${(props) => (props.$isError ? "#e53333" : "#434343")};
    }
  }

  textarea {
    resize: none;
    height: 6.25rem;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;

    input,
    textarea {
      font-size: 0.875rem;
    }
  }
`

export const EditCourseButton = styled.button`
  width: 100%;
  background-color: #5a72e0;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  padding: 0.9375rem 1.25rem;
  text-align: center;
  font-size: 1.125rem;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:disabled {
    opacity: 0.5;
    cursor: default;
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

export const BackButton = styled.button`
  background-color: #5a72e0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8125rem;
  height: 2.8125rem;
  transition: all 0.2s ease-in-out;
  align-self: center;

  &:hover {
    background-color: #2644cf;
  }
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

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 1.125rem;
    height: 1.125rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
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
