import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { ClinicsRepository } from "../clinicsRepository";

export class PrismaClinicsRepository implements ClinicsRepository {
  async create(clinicData: Prisma.ClinicUncheckedCreateInput) {
    // Cria o `Doctor` e associa ao `User` existente
    const clinic = await prisma.clinic.create({
      data: {
        name: "Clínica Exemplo",
        email: "contato@clinica.com",
        phone: "123456789",
        cnpj: "12345678000199",
        // Criando o usuário
        User: {
          create: {
            name: "Usuário Exemplo",
            email: "usuario@clinica.com",
            password: "senhaSegura",
            profile_type: "clinicAdmin",
          },
        },
      },
    });

    // Cria o `Address` associado ao `User`
    // await prisma.address.create({
    //   data: {
    //     zipCode: address.zipCode,
    //     city: address.city,
    //     state: address.state,
    //     number: address.number,
    //     complement: address.complement,
    //     street: address.street,
    //     user: {
    //       connect: {
    //         clinic: doctor.id,
    //       },
    //     },
    //   },
    // });

    return clinic;
  }
}
