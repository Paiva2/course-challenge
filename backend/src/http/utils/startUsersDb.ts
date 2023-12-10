import { hash } from "bcryptjs"
import { randomUUID } from "crypto"
import prisma from "../database/prisma/client"
import { IUser } from "../@types/types"

export default async function startUsersDb() {
  try {
    const studentPass = await hash("123456", 6)
    const professorPass = await hash("123456", 6)
    const adminPass = await hash("admin123", 6)

    const studentId = randomUUID()
    const professorId = randomUUID()
    const adminId = randomUUID()

    const [student, professor, admin] = await prisma.$queryRawUnsafe<IUser[]>(
      ` INSERT INTO public.user (id, name, password, role, email) 
        VALUES
        ($4, 'John Doe Student', $1, 'student', 'student@email.com'),
        ($5, 'John Doe Professor', $2, 'professor', 'professor@email.com'),
        ($6, 'John Doe Admin', $3, 'admin', 'admin@email.com')
        ON CONFLICT (name) DO NOTHING
        RETURNING *
        `,
      studentPass,
      professorPass,
      adminPass,
      studentId,
      professorId,
      adminId
    )

    if (student && professor && admin) {
      await prisma.$queryRawUnsafe(
        ` INSERT INTO public.wallet (id, total, "fkUser") 
              VALUES
              ($1, 0, $2),
              ($3, 0, $4),
              ($5, 0, $6)
              ON CONFLICT ("fkUser") DO NOTHING`,
        randomUUID(),
        student.id,
        randomUUID(),
        professor.id,
        randomUUID(),
        admin.id
      )

      console.log("Student, admin and professor users created successfully.")
    }
  } catch (e) {
    console.log(e)
    console.log("Error while creating base users.")
  }
}
