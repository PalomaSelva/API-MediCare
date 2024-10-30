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
    senha: z
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
    perfil_id: z.number(),
  });

  const registerDoctorBodySchema = registerBodySchema.extend({
    nome: z.string({ message: "Nome é obrigatório" }),
    sobrenome: z.string({ message: "Sobrenome é obrigatório" }),
    telefone: z.string({ message: "Telefone é obrigatório" }),
    especialidade: z.coerce.number(),
  });

  const { email, senha, perfil_id } = registerBodySchema.parse(request.body);

  try {
    const prismaPacientesRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterPatientUseCase(
      prismaPacientesRepository
    );

    await registerUseCase.execute({ email, senha, perfil_id });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
