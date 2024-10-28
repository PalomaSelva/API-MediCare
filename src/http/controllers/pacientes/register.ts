import { PrismaPacientesRepository } from "@/repositories/prisma/prisma-pacientes-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { RegisterUseCase } from "@/use-cases/pacientes/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
  });

  const { email, senha } = registerBodySchema.parse(request.body);

  try {
    const prismaPacientesRepository = new PrismaPacientesRepository();
    const registerUseCase = new RegisterUseCase(prismaPacientesRepository);

    await registerUseCase.execute({ email, senha });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
