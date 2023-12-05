-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "duration" INTEGER NOT NULL,
    "fkProfessor" VARCHAR(100) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question" VARCHAR(500) NOT NULL,
    "fkStudent" VARCHAR(100) NOT NULL,
    "fkCourse" VARCHAR(100) NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAnswer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answer" VARCHAR(500) NOT NULL,
    "fkQuestion" VARCHAR(100) NOT NULL,
    "fkUser" VARCHAR(100) NOT NULL,

    CONSTRAINT "QuestionAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_fkProfessor_fkey" FOREIGN KEY ("fkProfessor") REFERENCES "user"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_fkStudent_fkey" FOREIGN KEY ("fkStudent") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_fkCourse_fkey" FOREIGN KEY ("fkCourse") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_fkQuestion_fkey" FOREIGN KEY ("fkQuestion") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_fkUser_fkey" FOREIGN KEY ("fkUser") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
