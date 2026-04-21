/*
  Warnings:

  - A unique constraint covering the columns `[name,cropType,plantingDate,currentStage]` on the table `Field` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Field_name_cropType_plantingDate_currentStage_key" ON "Field"("name", "cropType", "plantingDate", "currentStage");
