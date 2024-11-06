import { prisma } from "../../lib/prisma";
import { PatientsRepository } from "../patientsRepository";
import { User } from "@prisma/client";

export class PrismaPatientsRepository implements PatientsRepository {
  async create(user: User) {
    const patient = await prisma.patient.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return patient.user;
  }
}
