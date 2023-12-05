import { ICourse } from "../../@types/types"
import CourseInterface from "../../interfaces/courseInterface"

type GetActiveCoursesServiceRequest = {
  page: number
}

type GetActiveCoursesServiceResponse = {
  totalPages: number
  page: number
  courses: ICourse[]
}

export default class GetActiveCoursesService {
  constructor(private courseInterface: CourseInterface) {}

  async exec({
    page = 1,
  }: GetActiveCoursesServiceRequest): Promise<GetActiveCoursesServiceResponse> {
    if (page < 1) {
      page = 1
    }

    const activeCourses = await this.courseInterface.getActives(page)

    return activeCourses
  }
}
