import { Patient } from "@prisma/client";
import { PatientsRepository } from "../patientsRepository";

export class InMemoryPatientsRepository implements PatientsRepository {
  public items: Patient[] = [];

  async create(userId: number) {
    const patient = {
      id: 1,
      user_id: userId,
    };

    this.items.push(patient);
    return patient;
  }
}
