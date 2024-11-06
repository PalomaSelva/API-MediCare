import { DataResponseCep } from "../../interfaces/cep";
import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios"; // Importe o axios
import { z } from "zod";

export async function getCep(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    cep: z
      .string()
      .min(8, { message: "O CEP deve conter, no mínimo, 8 caracteres." }),
  });

  const { cep } = registerBodySchema.parse(request.params);

  try {
    // Realiza a requisição HTTP para a API pública (ViaCEP) com Axios
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    const data: DataResponseCep = response.data; // Axios já retorna os dados na propriedade `data`

    const dataReturn = {
      cep: data.cep,
      rua: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
      estado: data.estado,
    };

    reply.status(200).send(dataReturn);
  } catch (error) {
    // Verifique o tipo de erro e envie uma resposta mais precisa, se necessário
    reply.status(500).send({ error: "Erro ao buscar o CEP" });
  }
}
