import { IQuestion } from "../@types/types"

export default interface QuestionInterface {
  create(studentId: string, courseId: string, content: string): Promise<IQuestion>
}
