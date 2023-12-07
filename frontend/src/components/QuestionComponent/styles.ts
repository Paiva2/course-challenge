import styled from "styled-components"

export const Question = styled.div`
  position: relative;
  padding-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;

  &:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }
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

export const QuoteArea = styled.form<{ $openQuote: boolean }>`
  width: 100%;
  margin-top: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: ${(props) => (props.$openQuote ? "12.5rem" : "0")};

  textarea {
    resize: none;
    outline: none;
    height: 9.375rem;
    width: 100%;
    padding: 0.9375rem;
    font-size: 1rem;
    background-color: #f7f8fd;
    border: 0;
    overflow-y: hidden;

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

export const QuoteButton = styled.button`
  display: flex;
  align-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
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
