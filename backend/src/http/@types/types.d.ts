export interface IUser {
  id?: string
  name: string
  password: string
  role: string
}

export interface HttpError {
  status: number
  message: string
}
