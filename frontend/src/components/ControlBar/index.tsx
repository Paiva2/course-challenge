"use client"

import React, { Fragment, useContext, useState } from "react"
import {
  Bar,
  BarWrapper,
  LeftSide,
  LoginLink,
  OpenProfileModal,
  RightSide,
} from "./styles"
import { MonitorPlay } from "lucide-react"
import { CourseContextProvider } from "@/contexts/courseContext"
import { UserContextProvider } from "@/contexts/userContext"
import ProfileModal from "../ProfileModal"

const ControlBar = () => {
  const { queryCourses } = useContext(CourseContextProvider)
  const { userProfile } = useContext(UserContextProvider)

  const [openProfile, setOpenProfile] = useState(false)

  return (
    <Bar>
      <BarWrapper>
        <RightSide>
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
        </RightSide>

        <LeftSide>
          {!userProfile.auth ? (
            <LoginLink href="/entrar">Entrar</LoginLink>
          ) : (
            <Fragment>
              <OpenProfileModal
                onClick={() => setOpenProfile(!openProfile)}
                type="button"
              >
                <img
                  alt={`${userProfile.data.name}'s Profile Pic`}
                  src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp"
                />
              </OpenProfileModal>

              <ProfileModal
                setOpenProfile={setOpenProfile}
                openProfile={openProfile}
              />
            </Fragment>
          )}
        </LeftSide>
      </BarWrapper>
    </Bar>
  )
}

export default ControlBar
