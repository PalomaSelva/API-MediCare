import { Doctor, Prisma, User } from "@prisma/client";

export interface DoctorsRepository {
  create(
    user: User,
    data: { address: Prisma.AddressCreateWithoutUserInput; specialty: number }
  ): Promise<Prisma.DoctorGetPayload<{ include: { user: true } }>>;
}
