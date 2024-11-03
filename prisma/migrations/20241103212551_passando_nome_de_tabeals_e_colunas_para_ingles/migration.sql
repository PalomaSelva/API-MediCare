/*
  Warnings:

  - You are about to drop the `Clinica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Convenio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doenca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Especialidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EspecialidadeMedico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experiencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Formacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicoClinica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicoConvenio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RedeSocial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('doctor', 'clinic', 'patient', 'clinicAdmin');

-- CreateEnum
CREATE TYPE "SocialMediaType" AS ENUM ('whatsapp', 'facebook', 'linkedin', 'youtube', 'twitter');

-- DropForeignKey
ALTER TABLE "Clinica" DROP CONSTRAINT "Clinica_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Doenca" DROP CONSTRAINT "Doenca_especialidade_id_fkey";

-- DropForeignKey
ALTER TABLE "EspecialidadeMedico" DROP CONSTRAINT "EspecialidadeMedico_especialidade_id_fkey";

-- DropForeignKey
ALTER TABLE "EspecialidadeMedico" DROP CONSTRAINT "EspecialidadeMedico_medico_id_fkey";

-- DropForeignKey
ALTER TABLE "Experiencia" DROP CONSTRAINT "Experiencia_medico_id_fkey";

-- DropForeignKey
ALTER TABLE "Formacao" DROP CONSTRAINT "Formacao_medico_id_fkey";

-- DropForeignKey
ALTER TABLE "Medico" DROP CONSTRAINT "Medico_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicoClinica" DROP CONSTRAINT "MedicoClinica_clinica_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicoClinica" DROP CONSTRAINT "MedicoClinica_medico_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicoConvenio" DROP CONSTRAINT "MedicoConvenio_convenio_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicoConvenio" DROP CONSTRAINT "MedicoConvenio_medico_id_fkey";

-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "RedeSocial" DROP CONSTRAINT "RedeSocial_usuario_id_fkey";

-- DropTable
DROP TABLE "Clinica";

-- DropTable
DROP TABLE "Convenio";

-- DropTable
DROP TABLE "Doenca";

-- DropTable
DROP TABLE "Especialidade";

-- DropTable
DROP TABLE "EspecialidadeMedico";

-- DropTable
DROP TABLE "Experiencia";

-- DropTable
DROP TABLE "Formacao";

-- DropTable
DROP TABLE "Medico";

-- DropTable
DROP TABLE "MedicoClinica";

-- DropTable
DROP TABLE "MedicoConvenio";

-- DropTable
DROP TABLE "Paciente";

-- DropTable
DROP TABLE "RedeSocial";

-- DropTable
DROP TABLE "Usuario";

-- DropEnum
DROP TYPE "TipoPerfil";

-- DropEnum
DROP TYPE "TipoRedeSocial";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "profile_pic" TEXT,
    "profile_type" "ProfileType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "registration_number" TEXT NOT NULL,
    "photo_01" TEXT,
    "photo_02" TEXT,
    "photo_03" TEXT,
    "video" TEXT,
    "about_me" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "admin_id" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "platform" "SocialMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "specialty_id" INTEGER NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorPlan" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,

    CONSTRAINT "DoctorPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorClinic" (
    "id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "clinic_id" INTEGER NOT NULL,

    CONSTRAINT "DoctorClinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialtyDoctor" (
    "specialty_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "SpecialtyDoctor_pkey" PRIMARY KEY ("doctor_id","specialty_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_user_id_key" ON "Doctor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_user_id_key" ON "Clinic"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorClinic_doctor_id_clinic_id_key" ON "DoctorClinic"("doctor_id", "clinic_id");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorPlan" ADD CONSTRAINT "DoctorPlan_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorPlan" ADD CONSTRAINT "DoctorPlan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorClinic" ADD CONSTRAINT "DoctorClinic_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorClinic" ADD CONSTRAINT "DoctorClinic_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialtyDoctor" ADD CONSTRAINT "SpecialtyDoctor_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialtyDoctor" ADD CONSTRAINT "SpecialtyDoctor_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
