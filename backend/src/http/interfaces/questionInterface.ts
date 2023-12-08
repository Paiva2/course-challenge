import { IQuestion } from "../@types/types"

export default interface QuestionInterface {
  create(
    studentId: string,
    courseId: string,
    content: string,
    name: string
  ): Promise<IQuestion>

  findById(id: string): Promise<IQuestion | null>

  findAllFromCourse(courseId: string): Promise<IQuestion[]>

  findAll(): Promise<IQuestion[]>
}
