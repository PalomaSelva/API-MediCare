import { app } from "@/app";
import { registerPatient } from "./controllers/register-patient";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes() {
  app.post("/users", registerPatient);
  app.post("/sessions", authenticate);
}
