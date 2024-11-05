import { app } from "@/app";
import { registerPatient } from "./controllers/register-patient";
import { authenticate } from "./controllers/authenticate";
import { registerDoctor } from "./controllers/register-doctor";

export async function appRoutes() {
  app.post("/patient", registerPatient);
  app.post("/doctor", registerDoctor);
  app.post("/sessions", authenticate);
}
