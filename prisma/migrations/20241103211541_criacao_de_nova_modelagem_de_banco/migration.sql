/*
  Warnings:

  - You are about to drop the column `descricao` on the `Especialidade` table. All the data in the column will be lost.
  - You are about to drop the `Perfil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Especialidade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `Especialidade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoPerfil" AS ENUM ('medico', 'clinica', 'paciente', 'admClinica');

-- CreateEnum
CREATE TYPE "TipoRedeSocial" AS ENUM ('whatsapp', 'facebook', 'linkedin', 'youtube', 'twitter');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_especialidade_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_perfil_id_fkey";

-- AlterTable
ALTER TABLE "Especialidade" DROP COLUMN "descricao",
ADD COLUMN     "nome" TEXT NOT NULL;

-- DropTable
DROP TABLE "Perfil";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "foto_perfil" TEXT,
    "tipo_perfil" "TipoPerfil" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "num_registro" TEXT NOT NULL,
    "foto_01" TEXT,
    "foto_02" TEXT,
    "foto_03" TEXT,
    "video" TEXT,
    "sobre_mim" TEXT,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinica" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "admin_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Clinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeSocial" (
    "id" SERIAL NOT NULL,
    "rede" "TipoRedeSocial" NOT NULL,
    "url" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "RedeSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doenca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "especialidade_id" INTEGER NOT NULL,

    CONSTRAINT "Doenca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "medico_id" INTEGER NOT NULL,

    CONSTRAINT "Formacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "medico_id" INTEGER NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convenio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Convenio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicoConvenio" (
    "id" SERIAL NOT NULL,
    "medico_id" INTEGER NOT NULL,
    "convenio_id" INTEGER NOT NULL,

    CONSTRAINT "MedicoConvenio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicoClinica" (
    "id" SERIAL NOT NULL,
    "medico_id" INTEGER NOT NULL,
    "clinica_id" INTEGER NOT NULL,

    CONSTRAINT "MedicoClinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EspecialidadeMedico" (
    "especialidade_id" INTEGER NOT NULL,
    "medico_id" INTEGER NOT NULL,

    CONSTRAINT "EspecialidadeMedico_pkey" PRIMARY KEY ("medico_id","especialidade_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_usuario_id_key" ON "Medico"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Clinica_usuario_id_key" ON "Clinica"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuario_id_key" ON "Paciente"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Doenca_nome_key" ON "Doenca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Convenio_nome_key" ON "Convenio"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "MedicoClinica_medico_id_clinica_id_key" ON "MedicoClinica"("medico_id", "clinica_id");

-- CreateIndex
CREATE UNIQUE INDEX "Especialidade_nome_key" ON "Especialidade"("nome");

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinica" ADD CONSTRAINT "Clinica_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeSocial" ADD CONSTRAINT "RedeSocial_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doenca" ADD CONSTRAINT "Doenca_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "Especialidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formacao" ADD CONSTRAINT "Formacao_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicoConvenio" ADD CONSTRAINT "MedicoConvenio_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicoConvenio" ADD CONSTRAINT "MedicoConvenio_convenio_id_fkey" FOREIGN KEY ("convenio_id") REFERENCES "Convenio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicoClinica" ADD CONSTRAINT "MedicoClinica_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicoClinica" ADD CONSTRAINT "MedicoClinica_clinica_id_fkey" FOREIGN KEY ("clinica_id") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecialidadeMedico" ADD CONSTRAINT "EspecialidadeMedico_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "Especialidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspecialidadeMedico" ADD CONSTRAINT "EspecialidadeMedico_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
