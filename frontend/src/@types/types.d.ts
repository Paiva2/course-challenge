export interface ICourseSchema {
  page: number
  totalCourses: number
  totalPages: number
  courses: ICourse[]
}

export interface ICourse {
  id: string
  title: string
  description: string
  duration: number
  fkProfessor: string
  createdAt: string
  updatedAt: string
  questions: IQuestion[]
}

export interface IQuestion {
  id: string
  createdAt: string
  fkCourse: string
  fkStudent: string
  question: string
  name: string
}

export interface IAnswer {
  id: string
  answer: string
  createdAt: string
  fkCourse: string
  fkProfessor: string
  fkQuestion: string
  name: string
}

export interface IToken {
  data: {
    id: string
    name: string
    role: string
  }

  expiresIn: string
  iat: number
}
