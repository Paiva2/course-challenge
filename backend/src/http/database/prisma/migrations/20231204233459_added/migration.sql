-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_fkProfessor_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_fkCourse_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_fkStudent_fkey";

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_fkStudent_fkey" FOREIGN KEY ("fkStudent") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_fkCourse_fkey" FOREIGN KEY ("fkCourse") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
