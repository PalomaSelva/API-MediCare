/*
  Warnings:

  - Added the required column `especialidade_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "especialidade_id" INTEGER NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "Especialidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
