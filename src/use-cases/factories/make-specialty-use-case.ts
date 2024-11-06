import { GetSpecialtyUseCase } from "../get-specialty";
import { PrismaSpecialtyRepository } from "./../../repositories/prisma/specialty-repository";
export function makeGetSpecialtyUseCase() {
  const prismaSpecialtyRepository = new PrismaSpecialtyRepository();
  const getSpecialtyUseCase = new GetSpecialtyUseCase(
    prismaSpecialtyRepository
  );

  return getSpecialtyUseCase;
}
