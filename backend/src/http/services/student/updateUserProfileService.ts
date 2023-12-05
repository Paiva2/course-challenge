import { UserInterface } from "../../interfaces/userInterface"

type UpdateUserProfileServiceRequest = {
  userId: string
  fields: {
    name?: string
    password?: string
  }
}

export default class UpdateUserProfileService {
  constructor(private userInterface: UserInterface) {}
}
