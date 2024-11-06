import { SpecialtyRepository } from "../repositories/specialtyRepository";
import { Specialty } from "@prisma/client";

interface GetSpecialtyUseCaseResponse {
  specialties: Specialty[];
}

export class GetSpecialtyUseCase {
  constructor(protected specialtyRepository: SpecialtyRepository) {}
  async execute(): Promise<GetSpecialtyUseCaseResponse> {
    const specialties = await this.specialtyRepository.getAll();

    return { specialties };
  }
}
