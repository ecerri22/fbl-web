/*
  Warnings:

  - You are about to drop the column `isElective` on the `ProgramCourse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[programId,courseId,year,semester,order]` on the table `ProgramCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ProgramCourse" DROP COLUMN "isElective";

-- CreateIndex
CREATE UNIQUE INDEX "ProgramCourse_programId_courseId_year_semester_order_key" ON "public"."ProgramCourse"("programId", "courseId", "year", "semester", "order");
