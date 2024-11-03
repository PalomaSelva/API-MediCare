import { prisma } from "@/lib/prisma";
import { PatientsRepository } from "../patientsRepository";

export class PrismaPatientsRepository implements PatientsRepository{
  async create(userId:number){
    const patient = await prisma.patient.create({
      data:{
        user:{
          connect:{
            id:userId
          }
        }
      }
    })

    return patient
  }
}