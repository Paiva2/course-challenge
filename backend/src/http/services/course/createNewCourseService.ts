import { ICourse, ICourseCreation } from "../../@types/types"
import CourseInterface from "../../interfaces/courseInterface"
import { UserInterface } from "../../interfaces/userInterface"

type CreateNewCourseServiceRequest = {
  professorId: string
  course: ICourseCreation
}

type CreateNewCourseServiceResponse = ICourse

export default class CreateNewCourseService {
  constructor(
    private userInterface: UserInterface,
    private courseInterface: CourseInterface
  ) {}

  async exec({
    course,
    professorId,
  }: CreateNewCourseServiceRequest): Promise<CreateNewCourseServiceResponse> {
    if (!professorId) {
      throw {
        status: 422,
        message: "Id do usuário inválido.",
      }
    }

    if (!course || !Object.keys(course).length) {
      throw {
        status: 422,
        message: "Informações do curso inválidas.",
      }
    }

    const doesProfessorExists = await this.userInterface.findById(professorId)

    if (!doesProfessorExists) {
      throw {
        status: 404,
        message: "Professor não encontrado nos registros.",
      }
    }

    if (doesProfessorExists.role === "student") {
      throw {
        status: 403,
        message: "Apenas um professor ou administrador pode registrar novos cursos.",
      }
    }

    const newCourse = await this.courseInterface.create(
      doesProfessorExists.id as string,
      course
    )

    return newCourse
  }
}
