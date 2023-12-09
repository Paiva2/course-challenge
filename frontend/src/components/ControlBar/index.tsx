"use client"

import React, { Fragment, useContext, useState } from "react"
import { CircleDollarSign, DollarSign, MonitorPlay, Plus } from "lucide-react"
import { CourseContextProvider } from "@/contexts/courseContext"
import { UserContextProvider } from "@/contexts/userContext"
import ProfileModal from "../ProfileModal"
import * as S from "./styles"
import BalanceModal from "../BalanceModal"

const ControlBar = () => {
  const { queryCourses } = useContext(CourseContextProvider)
  const { userProfile } = useContext(UserContextProvider)

  const [openProfile, setOpenProfile] = useState(false)
  const [openBalanceModal, setOpenBalanceModal] = useState(false)

  return (
    <Fragment>
      {userProfile.data.role === "professor" && (
        <S.NewCourseTrigger>
          <a href="/novo-curso">
            <Plus color="#fff" />
            Curso
          </a>
        </S.NewCourseTrigger>
      )}

      <S.Bar>
        <S.BarWrapper>
          <S.RightSide>
            <span>
              <MonitorPlay size={30} color="#fff" />
            </span>

            <p>
              {queryCourses.isLoading || queryCourses.isError ? (
                <span className="loadingQuantity" />
              ) : (
                queryCourses?.data?.totalCourses
              )}{" "}
              Cursos disponíveis
            </p>
          </S.RightSide>

          <div>
            {!userProfile.auth ? (
              <S.LoginLink href="/entrar">Entrar</S.LoginLink>
            ) : (
              <S.PersonalWrapper>
                {userProfile.data.role === "professor" && (
                  <S.BalanceButton
                    onClick={() => setOpenBalanceModal(!openBalanceModal)}
                    type="button"
                  >
                    <DollarSign size={30} color="#fff" />
                  </S.BalanceButton>
                )}

                <S.OpenProfileModal
                  onClick={() => setOpenProfile(!openProfile)}
                  type="button"
                >
                  <img
                    alt={`${userProfile.data.name}'s Profile Pic`}
                    src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp"
                  />
                </S.OpenProfileModal>

                <ProfileModal
                  setOpenProfile={setOpenProfile}
                  openProfile={openProfile}
                />

                <BalanceModal
                  openBalanceModal={openBalanceModal}
                  setOpenBalanceModal={setOpenBalanceModal}
                />
              </S.PersonalWrapper>
            )}
          </div>
        </S.BarWrapper>
      </S.Bar>
    </Fragment>
  )
}

export default ControlBar
