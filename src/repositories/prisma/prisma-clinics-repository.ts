import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { ClinicsRepository } from "../clinicsRepository";

export class PrismaClinicsRepository implements ClinicsRepository {
  async create(
    userAdmin: User,
    clinicData: Prisma.ClinicUncheckedCreateInput,
    address: Prisma.AddressCreateWithoutUserInput
  ) {
    const clinic = await prisma.clinic.create({
      data: {
        ...clinicData,

        User: {
          connect: {
            id: userAdmin.id,
          },
        },
      },
    });
    console.log(clinic);

    if (!address) return;
    await prisma.address.create({
      data: {
        zipCode: address.zipCode,
        city: address.city,
        state: address.state,
        number: address.number,
        complement: address.complement,
        street: address.street,
        clinic: {
          connect: {
            id: clinic.id,
          },
        },
        user: {
          connect: {
            id: userAdmin.id,
          },
        },
      },
    });

    return clinic;
  }
}
