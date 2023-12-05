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
}
