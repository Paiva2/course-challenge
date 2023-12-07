import styled from "styled-components"

export const ProfileModalOverlay = styled.div<{ $openedOverlay: boolean }>`
  transition: all 0.3s ease-in-out;

  opacity: ${(props) => (props.$openedOverlay ? "1" : "0")};
  visibility: ${(props) => (props.$openedOverlay ? "visible" : "hidden")};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProfileModalContainer = styled.div<{ $openedModal: boolean }>`
  opacity: ${(props) => (props.$openedModal ? "1" : "0")};
  visibility: ${(props) => (props.$openedModal ? "visible" : "hidden")};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 40.625rem;
  max-height: 50rem;
  height: fit-content;
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 8px;
  flex-direction: column;
  gap: 0.9375rem;
  transition: all 0.2s ease-in-out;
  position: relative;
`

export const CloseModalButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: all 0.2s ease-in-out;
`

export const ProfileForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const UserImage = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    cursor: pointer;
    border-radius: 100%;
    width: 10rem;
    height: 10rem;
    object-fit: contain;
  }
`

export const ProfileFormFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`

export const ProfileRole = styled.span`
  color: #fff;
  background-color: #5a72e0;
  border-radius: 8px;
  font-weight: 600;
  padding: 0.625rem 1.875rem;
  transition: 0.2s ease-in-out;
  user-select: none;

  &:hover {
    background-color: #2644cf;
  }
`

export const ProfileFormLabel = styled.label<{ $isError: boolean }>`
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

export const SaveProfileButton = styled.button`
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

export const ApiSuccess = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #32a13a;
  font-weight: 600;
`

export const LogoutButton = styled.button`
  width: 100%;
  background-color: #49527c;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  padding: 0.9375rem 1.25rem;
  text-align: center;
  font-size: 1.125rem;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.8;
  }
`
