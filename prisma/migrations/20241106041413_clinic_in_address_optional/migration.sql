-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clinic_id_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "clinic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
