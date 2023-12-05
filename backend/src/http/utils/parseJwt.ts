import jwt from "jsonwebtoken"
import { JwtParse } from "../@types/types"

export default function parseJwt(authorizationToken: string) {
  try {
    const token = authorizationToken

    const getToken = token?.replace("Bearer", "").trim()

    const decodedJwt = jwt.verify(getToken, process.env.JWT_SECRET as string)

    return decodedJwt as JwtParse
  } catch (e) {
    throw new Error("Token de autenticação inválido")
  }
}
