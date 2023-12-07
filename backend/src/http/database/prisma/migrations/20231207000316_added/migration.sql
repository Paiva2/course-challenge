-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_fkCourse_fkey";

-- DropForeignKey
ALTER TABLE "question_answer" DROP CONSTRAINT "question_answer_fkProfessor_fkey";

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_fkCourse_fkey" FOREIGN KEY ("fkCourse") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_answer" ADD CONSTRAINT "question_answer_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
