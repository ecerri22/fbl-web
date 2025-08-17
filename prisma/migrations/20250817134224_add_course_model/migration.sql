/*
  Warnings:

  - You are about to drop the column `courses` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Staff" DROP COLUMN "courses";

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CourseToStaff" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CourseToStaff_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_title_key" ON "public"."Course"("title");

-- CreateIndex
CREATE INDEX "_CourseToStaff_B_index" ON "public"."_CourseToStaff"("B");

-- AddForeignKey
ALTER TABLE "public"."_CourseToStaff" ADD CONSTRAINT "_CourseToStaff_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CourseToStaff" ADD CONSTRAINT "_CourseToStaff_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
