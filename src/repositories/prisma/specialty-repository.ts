import { prisma } from "@/lib/prisma";
import { SpecialtyRepository } from "../specialtyRepository";

export class PrismaSpecialtyRepository implements SpecialtyRepository {
  async getAll() {
    const specialties = await prisma.specialty.findMany();
    return specialties;
  }
}
