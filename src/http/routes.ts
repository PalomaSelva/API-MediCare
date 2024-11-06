import { app } from "@/app";
import { registerPatient } from "./controllers/register-patient";
import { authenticate } from "./controllers/authenticate";
import { registerDoctor } from "./controllers/register-doctor";
import { getSpecialty } from "./controllers/get-specialty";
import { getCep } from "./controllers/get-cep";

export async function appRoutes() {
  app.post("/patient", registerPatient);
  app.post("/doctor", registerDoctor);
  app.post("/sessions", authenticate);

  app.get("/specialties", getSpecialty);

  app.get("/cep/:cep", getCep);
}
