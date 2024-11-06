/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Clinic` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Clinic` table. All the data in the column will be lost.
  - Added the required column `email` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clinic" DROP CONSTRAINT "Clinic_user_id_fkey";

-- DropIndex
DROP INDEX "Clinic_user_id_key";

-- AlterTable
ALTER TABLE "Clinic" DROP COLUMN "admin_id",
DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clinicId" INTEGER;

-- CreateTable
CREATE TABLE "ClinicUser" (
    "clinicId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "ClinicUser_pkey" PRIMARY KEY ("clinicId","userId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
