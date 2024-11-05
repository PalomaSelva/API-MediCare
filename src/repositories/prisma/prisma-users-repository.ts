import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../usersRepository";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = prisma.user.create({
      data: {
        name: data.name ?? null,
        email: data.email,
        password: data.password,
        profile_type: data.profile_type,
        phone: data.phone ?? null,
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
