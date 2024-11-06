import { app } from "@/app";
import { FastifyRequest, FastifyReply } from "fastify";
import fetch from "node-fetch";
import { z } from "zod";

export async function getCep(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    cep: z
      .string()
      .min(8, { message: "O CEP deve conter, no mínimo, 8 caracteres." }),
  });

  const { cep } = registerBodySchema.parse(request.params);

  try {
    // Realiza a requisição HTTP para a API pública (ViaCEP)
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const data = await response.json();
    reply.status(200).send(data);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar o CEP" });
  }
}