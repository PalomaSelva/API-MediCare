import { app } from "@/app";
import { registerPatient } from "./controllers/register-patient";

export async function appRoutes() {
  app.post("/user", registerPatient);
}
