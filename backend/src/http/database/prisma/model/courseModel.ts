import { randomUUID } from "crypto"
import { ICourseCreation, ICourse } from "../../../@types/types"
import CourseInterface from "../../../interfaces/courseInterface"
import prisma from "../client"

export default class CourseModel implements CourseInterface {
  async create(professorId: string, course: ICourseCreation): Promise<ICourse> {
    const [createdCourse] = await prisma.$queryRawUnsafe<ICourse[]>(
      `INSERT INTO public.course 
      (id, title, duration, description, "fkProfessor") 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      randomUUID(),
      course.title,
      course.duration,
      course.description,
      professorId
    )

    return createdCourse
  }

  async findById(courseId: string): Promise<ICourse | null> {
    const [findCourse] = await prisma.$queryRawUnsafe<ICourse[]>(
      `SELECT * FROM public.course WHERE id = $1`,
      courseId
    )

    if (!findCourse) return null

    return {
      ...findCourse,
      professor: findCourse.fkProfessor,
    }
  }

  async updateFull(course: ICourse): Promise<ICourse> {
    const [updateCourseFull] = await prisma.$queryRawUnsafe<ICourse[]>(
      `UPDATE public.course 
      SET (title, description, duration, active) = ($2, $3, $4, $5) 
      WHERE id = $1 
      RETURNING *`,
      course.id,
      course.title,
      course.description,
      course.duration,
      course.active
    )

    return updateCourseFull
  }

  async getActives(
    page: number
  ): Promise<{ page: number; totalPages: number; courses: ICourse[] }> {
    const perPage = 10

    const offset = (page - 1) * perPage

    const activeCourses = await prisma.$queryRawUnsafe<ICourse[]>(
      `SELECT *
      FROM public.course
      WHERE active = true
      ORDER BY "createdAt" DESC
      LIMIT $1
      OFFSET $2
    `,
      perPage,
      offset
    )

    const pageTotal = Math.ceil(activeCourses.length / perPage)

    return {
      page,
      totalPages: pageTotal,
      courses: activeCourses,
    }
  }
}
