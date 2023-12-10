import { ICourse, ICourseCreation } from "../../@types/types"
import CourseInterface from "../../interfaces/courseInterface"
import { PendingPaymentInterface } from "../../interfaces/pendingPaymentInterface"
import { UserInterface } from "../../interfaces/userInterface"

type CreateNewCourseServiceRequest = {
  professorId: string
  course: ICourseCreation
}

type CreateNewCourseServiceResponse = ICourse

export default class CreateNewCourseService {
  constructor(
    private userInterface: UserInterface,
    private courseInterface: CourseInterface,
    private pendingPaymentInterface: PendingPaymentInterface
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

    await this.generatePendingPayment(
      course.duration,
      doesProfessorExists.id as string
    )

    return newCourse
  }

  private async generatePendingPayment(duration: number, professorId: string) {
    const courseDuration = duration

    const paymentPerHour = 300 //300.00/h

    const hoursToPay = Math.floor(courseDuration / 3600) * paymentPerHour

    const courseDurationMinutes = Math.floor((courseDuration % 3600) / 60)

    const minutesToPay =
      courseDurationMinutes < 1 ? 0 : paymentPerHour / courseDurationMinutes

    const totalPayment = hoursToPay + minutesToPay

    await this.pendingPaymentInterface.create(
      +totalPayment.toFixed(2),
      "course",
      professorId
    )
  }
}
