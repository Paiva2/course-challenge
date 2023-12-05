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

  async findById(courseId: string): Promise<ICourse | null> {
    const findCourse = this.courses.find((course) => course.id === courseId)

    if (!findCourse) return null

    return findCourse
  }

  async updateFull(course: ICourse): Promise<ICourse> {
    let courseUpdated = {} as ICourse

    const updateList = this.courses.map((onBaseCourse) => {
      if (onBaseCourse.id === course.id) {
        onBaseCourse = course

        courseUpdated = onBaseCourse
      }

      return onBaseCourse
    })

    this.courses = updateList

    return courseUpdated
  }

  async getActives(
    page: number
  ): Promise<{ page: number; totalPages: number; courses: ICourse[] }> {
    const perPage = 10

    const getActiveCourses = this.courses.filter((course) => course.active)

    const totalPages = Math.ceil(getActiveCourses.length / perPage)

    return {
      totalPages,
      page,
      courses: getActiveCourses.slice((page - 1) * perPage, page * perPage),
    }
  }
}
