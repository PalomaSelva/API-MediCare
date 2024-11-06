import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { DoctorsRepository } from "../doctorsRepository";

export class PrismaDoctorsRepository implements DoctorsRepository {
  async create(
    user: User,
    data: { address: Prisma.AddressCreateWithoutUserInput; specialty: number }
  ) {
    const { address, specialty } = data;
    // Cria o `Doctor` e associa ao `User` existente
    const doctor = await prisma.doctor.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        Specialties: {
          create: {
            specialty: {
              connect: {
                id: specialty,
              },
            },
          },
        },
      },
      include: {
        user: true,
        Specialties: true,
      },
    });

    // Cria o `Address` associado ao `User`
    await prisma.address.create({
      data: {
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        number: address.number,
        complement: address.complement,
        street: address.street,

        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return doctor;
  }
}
