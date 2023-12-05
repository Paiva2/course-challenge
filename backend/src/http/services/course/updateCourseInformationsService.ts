import { ICourse } from "../../@types/types"
import { UserInterface } from "../../interfaces/userInterface"
import CourseInterface from "../../interfaces/courseInterface"

type UpdateCourseInformationsServiceRequest = {
  professorId: string
  courseId: string
  fieldsToUpdate: {
    title?: string
    duration?: string
    description?: string
    active?: boolean
  }
}

type UpdateCourseInformationsServiceResponse = ICourse

export default class UpdateCourseInformationsService {
  constructor(
    private userInterface: UserInterface,
    private courseInterface: CourseInterface
  ) {}

  async exec({
    professorId,
    courseId,
    fieldsToUpdate,
  }: UpdateCourseInformationsServiceRequest): Promise<UpdateCourseInformationsServiceResponse> {
    if (!professorId) {
      throw {
        status: 422,
        message: "Id do professor inválido.",
      }
    }

    const doesProfessorExists = await this.userInterface.findById(professorId)

    if (!doesProfessorExists) {
      throw {
        status: 404,
        message: "Professor não encontrado.",
      }
    }

    const doesCourseExists = await this.courseInterface.findById(courseId)

    if (!doesCourseExists) {
      throw {
        status: 404,
        message: "Curso não encontrado.",
      }
    }

    const doesCourseBelongsToThisProfessor =
      doesCourseExists.professor === professorId

    if (!doesCourseBelongsToThisProfessor) {
      throw {
        status: 403,
        message: "Permissões insuficientes.",
      }
    }

    const fields = Object.keys(fieldsToUpdate)

    if (fields.length < 1) return doesCourseExists

    let courseUpdate: ICourse = doesCourseExists

    for (let field of fields) {
      const changingField = field as keyof typeof fieldsToUpdate

      courseUpdate = {
        ...courseUpdate,
        [field]: fieldsToUpdate[changingField],
      }
    }

    const updateCourseInfos = await this.courseInterface.updateFull(courseUpdate)

    return updateCourseInfos
  }
}
