/*
  Warnings:

  - You are about to drop the column `fkUser` on the `question_answer` table. All the data in the column will be lost.
  - Added the required column `fkProfessor` to the `question_answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "question_answer" DROP CONSTRAINT "question_answer_fkUser_fkey";

-- AlterTable
ALTER TABLE "question_answer" DROP COLUMN "fkUser",
ADD COLUMN     "fkProfessor" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
