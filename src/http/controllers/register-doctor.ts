import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterDoctorUseCase } from "@/use-cases/factories/make-register-doctor-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerDoctor(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
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
    specialty: z.coerce.number(),
    address: z.object({
      zipCode: z.string().max(8),
      city: z.string(),
      state: z.string(),
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
    }),
  });

  const { name, email, password, specialty, address } =
    registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterDoctorUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
      specialty,
      address,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
