/*
  Warnings:

  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_fkUser_fkey";

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fkUser" VARCHAR(100) NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_fkUser_key" ON "wallet"("fkUser");

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_fkUser_fkey" FOREIGN KEY ("fkUser") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
