-- CreateEnum
CREATE TYPE "public"."ProgramLevel" AS ENUM ('BACHELOR', 'PROFESSIONAL_MASTER', 'MASTER_OF_SCIENCE', 'INTEGRATED_MASTER');

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "shortDescription" TEXT,
    "image" TEXT,
    "quote" TEXT,
    "highlights" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "public"."ProgramLevel" NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "whyTitle" TEXT,
    "whyIntro" TEXT,
    "whyBulletPoints" JSONB,
    "careerIntro" TEXT,
    "careerBulletPoints" JSONB,
    "futureIntro" TEXT,
    "future" JSONB,
    "admission" JSONB,
    "curriculum" JSONB,
    "duration" TEXT,
    "language" TEXT,
    "tuition" TEXT,
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "isFullTime" BOOLEAN,
    "photoUrl" TEXT,
    "email" TEXT,
    "office" TEXT,
    "officePhone" TEXT,
    "bio" TEXT,
    "expertise" TEXT[],
    "courses" TEXT[],
    "publications" TEXT[],
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeLabel" TEXT,
    "location" TEXT,
    "image" TEXT,
    "description" TEXT,
    "content" TEXT[],
    "categories" TEXT[],
    "organizer" JSONB,
    "highlights" JSONB,
    "departmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsArticle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "image" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "author" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "readingTime" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT[],
    "departmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResearchProject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coordinator" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "field" TEXT,
    "partners" TEXT[],
    "description" TEXT NOT NULL,
    "departmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_code_key" ON "public"."Department"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Department_slug_key" ON "public"."Department"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "public"."Program"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_slug_key" ON "public"."Staff"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "public"."Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_slug_key" ON "public"."NewsArticle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchProject_slug_key" ON "public"."ResearchProject"("slug");

-- AddForeignKey
ALTER TABLE "public"."Program" ADD CONSTRAINT "Program_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewsArticle" ADD CONSTRAINT "NewsArticle_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchProject" ADD CONSTRAINT "ResearchProject_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
