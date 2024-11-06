import { Specialty } from "@prisma/client";

export interface SpecialtyRepository {
  getAll(): Promise<Specialty[]>;
}
