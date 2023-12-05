export interface IUser {
  id?: string
  name: string
  password?: string
  role: string
}

export interface HttpError {
  status: number
  message: string
}

export interface ICourse {
  id?: string
  title: string
  duration: number
  questions?: []
  professor?: string
  active?: boolean
  description: string
  createdAt?: Date
  updatedAt?: Date
  fkProfessor?: string
}

export interface ICourseCreation {
  title: string
  duration: number
  description: string
}

export interface JwtParse {
  data: {
    id: string
    name: string
    role: string
  }

  expiresIn: string
  iat: number
}
