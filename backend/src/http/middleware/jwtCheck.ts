import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export default function jwtCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization

    const getToken = token?.replace("Bearer", "").trim()

    const decodedJwt = jwt.verify(
      getToken.toString(),
      process.env.JWT_SECRET as string
    )

    if (decodedJwt) {
      next()
    }
  } catch (e) {
    return res.status(403).send({ message: "Token de autenticação inválido." })
  }
}
