import { Patient } from "@prisma/client";

export interface PatientsRepository{
  create(userId:number):Promise<Patient>
}