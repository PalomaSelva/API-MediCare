import { prisma } from "../../lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user: User = {
      id: Math.round(Math.random() * 10),
      name: data.name ?? null,
      email: data.email,
      password: data.password,
      phone: data.phone ?? null,
      profile_type: data.profile_type,
      profile_pic: data.profile_pic ?? null,
      clinic_id: data.clinic_id ?? null,
    };
    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
