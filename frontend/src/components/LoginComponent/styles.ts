import styled from "styled-components"

export const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const LoginWrapper = styled.div`
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
`

export const LoginFormTitle = styled.div`
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
`

export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgb(245, 245, 245) 9px 13px 9px -6px;
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
`

export const LoginFields = styled.div`
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

  input {
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
`

export const LoginButton = styled.button`
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

export const BackLink = styled.a`
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
