/*
  Warnings:

  - Added the required column `name` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `question_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question" ADD COLUMN     "name" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "question_answer" ADD COLUMN     "name" VARCHAR(100) NOT NULL;
