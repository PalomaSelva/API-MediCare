import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
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

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}
