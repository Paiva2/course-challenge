import { ICourse, IQuestion } from "../../@types/types"
import CourseInterface from "../../interfaces/courseInterface"
import QuestionInterface from "../../interfaces/questionInterface"

type GetActiveCoursesServiceRequest = {
  page: number
}

type GetActiveCoursesServiceResponse = {
  totalPages: number
  page: number
  courses: ICourse[]
}

export default class GetActiveCoursesService {
  constructor(
    private courseInterface: CourseInterface,
    private questionInterface: QuestionInterface
  ) {}

  async exec({
    page = 1,
  }: GetActiveCoursesServiceRequest): Promise<GetActiveCoursesServiceResponse> {
    if (page < 1) {
      page = 1
    }

    const activeCourses = await this.courseInterface.getActives(page)

    const questions = await this.questionInterface.findAll()

    let formatCourses: ICourse[] = []

    for (let course of activeCourses.courses) {
      const courseQuestions = questions.find(
        (question) => question.fkCourse === course.id
      )

      const doesCourseHasMoreQuestions = formatCourses.find(
        (baseCourse) => baseCourse.id === course.id
      )

      if (courseQuestions) {
        if (doesCourseHasMoreQuestions) {
          doesCourseHasMoreQuestions?.questions?.push(courseQuestions)
        } else {
          formatCourses.push({ ...course, questions: [courseQuestions] })
        }
      } else {
        formatCourses.push({ ...course, questions: [] })
      }
    }

    return {
      ...activeCourses,
      courses: formatCourses,
    }
  }
}
