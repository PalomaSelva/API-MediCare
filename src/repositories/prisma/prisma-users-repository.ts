import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../usersRepository";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = prisma.user.create({
      data: {
        email: data.email,
        senha: data.senha,
        perfil_id: data.perfil_id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
