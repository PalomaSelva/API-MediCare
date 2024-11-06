import { makeGetSpecialtyUseCase } from "../../use-cases/factories/make-specialty-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getSpecialty(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const specialtyUseCase = makeGetSpecialtyUseCase();

  const { specialties } = await specialtyUseCase.execute();

  return reply.status(200).send(specialties);
}
