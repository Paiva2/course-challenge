-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_fkProfessor_fkey";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
