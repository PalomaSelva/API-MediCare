import { User } from "@prisma/client";

export interface PatientsRepository {
  create(user: User): Promise<User>;
}
