/*
  Warnings:

  - You are about to drop the `QuestionAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_fkQuestion_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_fkUser_fkey";

-- DropTable
DROP TABLE "QuestionAnswer";

-- CreateTable
CREATE TABLE "question_answer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answer" VARCHAR(500) NOT NULL,
    "fkQuestion" VARCHAR(100) NOT NULL,
    "fkUser" VARCHAR(100) NOT NULL,

    CONSTRAINT "question_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_fkQuestion_fkey" FOREIGN KEY ("fkQuestion") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_fkUser_fkey" FOREIGN KEY ("fkUser") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
