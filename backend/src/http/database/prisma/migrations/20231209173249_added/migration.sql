-- DropForeignKey
ALTER TABLE "finished_payments" DROP CONSTRAINT "finished_payments_fkProfessor_fkey";

-- DropForeignKey
ALTER TABLE "pending_payments" DROP CONSTRAINT "pending_payments_fkProfessor_fkey";

-- AddForeignKey
ALTER TABLE "pending_payments" ADD CONSTRAINT "pending_payments_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_payments" ADD CONSTRAINT "finished_payments_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
