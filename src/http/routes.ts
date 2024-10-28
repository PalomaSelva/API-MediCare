import { app } from "@/app";
import { register } from "./controllers/pacientes/register";

export async function appRoutes() {
  app.post("/pacientes", register);
}
