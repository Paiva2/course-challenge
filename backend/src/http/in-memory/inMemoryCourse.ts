import { randomUUID } from "crypto"
import { ICourse } from "../@types/types"
import CourseInterface from "../interfaces/courseInterface"

export default class InMemoryCourse implements CourseInterface {
  private courses = [] as ICourse[]

  async create(professorId: string, course: ICourse): Promise<ICourse> {
    const newCourse = {
      id: randomUUID(),
      title: course.title,
      duration: course.duration,
      professor: professorId,
      active: true,
      description: course.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.courses.push(newCourse)

    return newCourse
  }
}
