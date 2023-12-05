/*
  Warnings:

  - Added the required column `fkCourse` to the `question_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question_answer" ADD COLUMN     "fkCourse" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_fkCourse_fkey" FOREIGN KEY ("fkCourse") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
