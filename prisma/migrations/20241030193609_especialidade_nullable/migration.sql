-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_especialidade_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "especialidade_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_especialidade_id_fkey" FOREIGN KEY ("especialidade_id") REFERENCES "Especialidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
