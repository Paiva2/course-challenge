"use client"

import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
import { UserContextProvider } from "@/contexts/userContext"
import { AxiosError } from "axios"
import { useQueryClient } from "react-query"
import Cookies from "js-cookie"
import { X } from "lucide-react"
import api from "@/lib/api"
import * as S from "./styles"

interface IFormErrors {
  name: string
  password: string
  confirmPassword: string
}

interface IProfileModalProps {
  openProfile: boolean
  setOpenProfile: Dispatch<SetStateAction<boolean>>
}

const defaultFormFields = {
  name: "",
  password: "",
  passwordConfirmation: "",
}

const ProfileModal = ({ openProfile, setOpenProfile }: IProfileModalProps) => {
  const { userProfile } = useContext(UserContextProvider)

  const [formFields, setFormFields] = useState(defaultFormFields)

  const [formErrors, setFormErrors] = useState({} as IFormErrors)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [apiSuccess, setApiSuccess] = useState("")
  const [apiErrors, setApiErrors] = useState("")

  const queryClient = useQueryClient()

  useEffect(() => {
    setFormFields((oldValue) => {
      return {
        ...oldValue,
        name: userProfile.data.name,
      }
    })
  }, [userProfile.data.name, openProfile])

  function handleChangeInputValue(field: string, value: string) {
    setFormFields((oldValue) => {
      return {
        ...oldValue,
        [field]: value,
      }
    })
  }

  async function submitInformations() {
    const fields = {} as { name?: string; password?: string }

    if (formFields.password) {
      fields.password = formFields.password
    }

    if (formFields.name !== userProfile.data.name && formFields.name) {
      fields.name = formFields.name
    }

    if (!Object.keys(fields).length) {
      setFormSubmitting(false)

      return
    }

    try {
      const submitUpdate = await api.patch(
        "/profile",
        { fields },
        {
          headers: {
            Authorization: `Bearer ${userProfile.token}`,
          },
        }
      )

      if (submitUpdate.status === 200) {
        setApiSuccess(submitUpdate.data.message)

        setFormFields((oldValue) => {
          return { ...oldValue, password: "", passwordConfirmation: "" }
        })

        queryClient.invalidateQueries("fetchUser")

        setTimeout(() => setApiSuccess(""), 4000)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setApiErrors(e.response?.data.message)
      }
    } finally {
      setFormSubmitting(false)
    }
  }

  function checkFormErrors() {
    const errors = {} as IFormErrors

    if (formFields.name && formFields.name.length < 3) {
      errors.name = "O nome precisa ter pelo menos 3 caracteres"
    }

    if (formFields.password && formFields.password.length < 6) {
      errors.password = "A senha precisa ter pelo menos 6 caracteres"
    }

    if (
      formFields.password &&
      formFields.passwordConfirmation !== formFields.password
    ) {
      errors.confirmPassword = "A confirmação de senha precisa ser igual a senha"
    }

    setFormErrors(errors)
  }

  function handleInitSubmit(e: FormEvent) {
    e.preventDefault()

    checkFormErrors()

    setApiErrors("")

    setFormSubmitting(true)
  }

  useEffect(() => {
    const doesFormHasErrors = Object.keys(formErrors)

    if (!doesFormHasErrors.length && formSubmitting) {
      submitInformations()
    } else {
      setFormSubmitting(false)
    }
  }, [formErrors])

  function handleLogout() {
    Cookies.remove("cursos-auth")

    window.location.reload()
  }

  function handleCloseProfile() {
    !formSubmitting && setOpenProfile(!openProfile)

    setFormFields(defaultFormFields)

    setApiErrors("")
    setApiSuccess("")
  }

  return (
    <S.ProfileModalOverlay $openedOverlay={openProfile}>
      <S.ProfileModalContainer $openedModal={openProfile}>
        <S.CloseModalButton onClick={handleCloseProfile} type="button">
          <X color="#d75d5d" size={45} />
        </S.CloseModalButton>
        <S.UserImage>
          <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp" />
        </S.UserImage>

        <S.ProfileRole>
          <p>{userProfile.data.role === "student" ? "Estudante" : "Professor"}</p>
        </S.ProfileRole>
        <S.ProfileForm onSubmit={handleInitSubmit}>
          <S.ProfileFormFields>
            <S.ProfileFormLabel $isError={false}>
              Nome
              <input
                value={formFields.name}
                onChange={({ target }) =>
                  handleChangeInputValue("name", target.value)
                }
                placeholder="Digite seu nome"
                type="text"
              />
              {formErrors.name && (
                <p className="validationError">{formErrors.name}</p>
              )}
            </S.ProfileFormLabel>

            <S.ProfileFormLabel $isError={false}>
              Nova senha
              <input
                value={formFields.password}
                onChange={({ target }) =>
                  handleChangeInputValue("password", target.value)
                }
                placeholder="Digite sua nova senha"
                type="password"
              />
              {formErrors.password && (
                <p className="validationError">{formErrors.password}</p>
              )}
            </S.ProfileFormLabel>

            <S.ProfileFormLabel $isError={false}>
              Confirmar nova senha
              <input
                value={formFields.passwordConfirmation}
                onChange={({ target }) =>
                  handleChangeInputValue("passwordConfirmation", target.value)
                }
                placeholder="Confirme sua nova senha"
                type="password"
              />
              {formErrors.confirmPassword && (
                <p className="validationError">{formErrors.confirmPassword}</p>
              )}
            </S.ProfileFormLabel>
          </S.ProfileFormFields>

          <S.ApiSuccess>{apiSuccess && <p>{apiSuccess}</p>}</S.ApiSuccess>
          <S.ApiError>{apiErrors && <p>{apiErrors}</p>}</S.ApiError>

          <S.SaveProfileButton disabled={formSubmitting} type="submit">
            Salvar
          </S.SaveProfileButton>
        </S.ProfileForm>

        <S.LogoutButton
          disabled={formSubmitting}
          type="button"
          onClick={handleLogout}
        >
          Deslogar
        </S.LogoutButton>
      </S.ProfileModalContainer>
    </S.ProfileModalOverlay>
  )
}

export default ProfileModal
