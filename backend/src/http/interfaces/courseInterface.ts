import { ICourse, ICourseCreation } from "../@types/types"

export default interface CourseInterface {
  create(professorId: string, course: ICourseCreation): Promise<ICourse>

  findById(courseId: string): Promise<ICourse | null>

  updateFull(course: ICourse): Promise<ICourse>

  getActives(page: number): Promise<{
    page: number
    totalPages: number
    courses: ICourse[]
    totalCourses: number
  }>
}
