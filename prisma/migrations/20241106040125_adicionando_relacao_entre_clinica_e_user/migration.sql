/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Clinic` table. All the data in the column will be lost.
  - The primary key for the `ClinicUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clinicId` on the `ClinicUser` table. All the data in the column will be lost.
  - You are about to drop the column `clinicId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clinic_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clinic_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `ClinicUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClinicUser" DROP CONSTRAINT "ClinicUser_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clinicId_fkey";

-- DropIndex
DROP INDEX "Address_userId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId",
ADD COLUMN     "clinic_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "address",
ALTER COLUMN "cnpj" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ClinicUser" DROP CONSTRAINT "ClinicUser_pkey",
DROP COLUMN "clinicId",
ADD COLUMN     "clinic_id" INTEGER NOT NULL,
ADD CONSTRAINT "ClinicUser_pkey" PRIMARY KEY ("clinic_id", "userId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clinicId",
ADD COLUMN     "clinic_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_clinic_id_key" ON "Address"("clinic_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
