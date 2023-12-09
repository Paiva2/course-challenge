-- CreateEnum
CREATE TYPE "PaymentReason" AS ENUM ('course', 'questionAnswered');

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fkUser" VARCHAR(100) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(10,2) NOT NULL,
    "reason" "PaymentReason" NOT NULL,
    "fkProfessor" VARCHAR(100) NOT NULL,

    CONSTRAINT "pending_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finished_payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(10,2) NOT NULL,
    "reason" "PaymentReason" NOT NULL,
    "fkProfessor" VARCHAR(100) NOT NULL,

    CONSTRAINT "finished_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_fkUser_key" ON "Wallet"("fkUser");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_fkUser_fkey" FOREIGN KEY ("fkUser") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pending_payments" ADD CONSTRAINT "pending_payments_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_payments" ADD CONSTRAINT "finished_payments_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
