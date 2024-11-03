import { PrismaPatientsRepository } from "@/repositories/prisma/prisma-patients-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { RegisterPatientUseCase } from "@/use-cases/register-patient";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPatient(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "A senha deve conter, no mínimo, 8 caracteres." })
      .refine((password) => /[A-Z]/.test(password), {
        message: "A senha deve conter letras maiúsculas.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "A senha deve conter letras minúsculas.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "A senha deve conter números.",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "A senha deve conter caracteres especiais.",
      }),
  });


  const { email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const prismaPatientsRepository = new PrismaPatientsRepository();
    const registerUseCase = new RegisterPatientUseCase(
      prismaUsersRepository,
      prismaPatientsRepository
    );

    await registerUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}