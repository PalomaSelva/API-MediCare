import { Patient, Prisma, ProfileType, User } from "@prisma/client";
import { PatientsRepository } from "../patientsRepository";
import { create } from "domain";
import { number } from "zod";

export class InMemoryPatientsRepository implements PatientsRepository {
  public items: Prisma.PatientGetPayload<{ include: { user: true } }>[] = [];

  async create(user: User) {
    const patient = {
      id: 2,
      user_id: user.id,
      user: {
        id: user.id,
        name: null,
        email: user.email,
        password: user.password,
        phone: null,
        profile_pic: null,
        profile_type: "patient" as ProfileType,
      },
    };

    this.items.push(patient);
    return patient.user;
  }
}
