import { PrismaClient, ProgramLevel } from "@prisma/client";

import { departmentsData } from "../src/data/departmentsData";
import { allPrograms } from "../src/data/allPrograms";
import { events as eventsData } from "../src/data/eventsData";
import { newsData } from "../src/data/newsData";
import { researchProjects } from "../src/data/researchProjects";

const prisma = new PrismaClient();

function mapLevel(level: string): ProgramLevel {
  const v = level.trim().toLowerCase();
  if (v === "bachelor") return ProgramLevel.BACHELOR;
  if (v === "professional master") return ProgramLevel.PROFESSIONAL_MASTER;
  if (v === "master of science") return ProgramLevel.MASTER_OF_SCIENCE;
  if (v === "integrated master") return ProgramLevel.INTEGRATED_MASTER;
  throw new Error(`Unknown ProgramLevel: ${level}`);
}

function toDate(dateStr: string | Date | undefined): Date {
  if (!dateStr) return new Date();
  if (dateStr instanceof Date) return dateStr;
  return new Date(`${dateStr}T00:00:00.000Z`);
}

async function seedDepartmentsAndStaff() {
  for (const dep of departmentsData) {
    const department = await prisma.department.upsert({
      where: { code: dep.code },
      update: {
        name: dep.name,
        slug: dep.slug,
        description: dep.description ?? null,
        shortDescription: dep.shortDescription ?? null,
        image: dep.image ?? null,
        quote: dep.quote ?? null,
        highlights: dep.highlights ?? [],
      },
      create: {
        code: dep.code,
        name: dep.name,
        slug: dep.slug,
        description: dep.description ?? null,
        shortDescription: dep.shortDescription ?? null,
        image: dep.image ?? null,
        quote: dep.quote ?? null,
        highlights: dep.highlights ?? [],
      },
    });

    // Seed Staff from the department’s staff array
    if (Array.isArray(dep.staff)) {
      for (const s of dep.staff) {
        await prisma.staff.upsert({
          where: { slug: s.slug },
          update: {
            name: s.name,
            title: s.title ?? null,
            isFullTime: typeof s.fullTime === "boolean" ? s.fullTime : null,
            photoUrl: s.img ?? null,
            email: s.email ?? null,
            office: s.office ?? null,
            officePhone: null,
            bio: null,
            expertise: [],
            courses: [],
            publications: [],
            departmentId: department.id,
          },
          create: {
            slug: s.slug,
            name: s.name,
            title: s.title ?? null,
            isFullTime: typeof s.fullTime === "boolean" ? s.fullTime : null,
            photoUrl: s.img ?? null,
            email: s.email ?? null,
            office: s.office ?? null,
            officePhone: null,
            bio: null,
            expertise: [],
            courses: [],
            publications: [],
            departmentId: department.id,
          },
        });
      }
    }
  }
}

async function seedPrograms() {
  const depts = await prisma.department.findMany({ select: { id: true, code: true, slug: true } });
  const byCode = new Map(depts.map(d => [d.code, d.id]));
  const bySlug = new Map(depts.map(d => [d.slug, d.id]));

  for (const p of allPrograms) {
    const deptId =
      (p.departmentCode && byCode.get(p.departmentCode)) ||
      (p.departmentSlug && bySlug.get(p.departmentSlug)) ||
      null;

    if (!deptId) {
      console.warn(`⚠️  No department match for program "${p.name}" (code: ${p.departmentCode}, slug: ${p.departmentSlug}). Skipping.`);
      continue;
    }

    await prisma.program.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        level: mapLevel(p.level),
        image: (p as any).image ?? null,
        description: p.description ?? null,
        whyTitle: (p as any).whyTitle ?? null,
        whyIntro: (p as any).whyIntro ?? null,
        whyBulletPoints: (p as any).whyBulletPoints ?? null,
        careerIntro: (p as any).careerIntro ?? null,
        careerBulletPoints: (p as any).careerBulletPoints ?? null,
        futureIntro: (p as any).futureIntro ?? null,
        future: (p as any).future ?? null,
        admission: (p as any).admission ?? null,
        curriculum: (p as any).curriculum ?? null,
        duration: (p as any).duration ?? null,
        language: (p as any).language ?? null,
        tuition: (p as any).tuition ?? null,
        departmentId: deptId,
      },
      create: {
        name: p.name,
        slug: p.slug,
        level: mapLevel(p.level),
        image: (p as any).image ?? null,
        description: p.description ?? null,
        whyTitle: (p as any).whyTitle ?? null,
        whyIntro: (p as any).whyIntro ?? null,
        whyBulletPoints: (p as any).whyBulletPoints ?? null,
        careerIntro: (p as any).careerIntro ?? null,
        careerBulletPoints: (p as any).careerBulletPoints ?? null,
        futureIntro: (p as any).futureIntro ?? null,
        future: (p as any).future ?? null,
        admission: (p as any).admission ?? null,
        curriculum: (p as any).curriculum ?? null,
        duration: (p as any).duration ?? null,
        language: (p as any).language ?? null,
        tuition: (p as any).tuition ?? null,
        departmentId: deptId,
      },
    });
  }
}

async function seedEvents() {
  for (const ev of eventsData) {
    // Some events have duplicate slugs in your data; upsert will simply update the same row.
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {
        title: ev.title,
        date: toDate(ev.date),
        timeLabel: ev.time ?? null,
        location: ev.location ?? null,
        image: ev.image ?? null,
        description: ev.description ?? null,
        content: Array.isArray(ev.content) ? ev.content : [],
        categories: Array.isArray(ev.categories) ? ev.categories : [],
        organizer: ev.organizer ?? null,
        highlights: ev.highlights ?? null,
        departmentId: null,
      },
      create: {
        title: ev.title,
        slug: ev.slug,
        date: toDate(ev.date),
        timeLabel: ev.time ?? null,
        location: ev.location ?? null,
        image: ev.image ?? null,
        description: ev.description ?? null,
        content: Array.isArray(ev.content) ? ev.content : [],
        categories: Array.isArray(ev.categories) ? ev.categories : [],
        organizer: ev.organizer ?? null,
        highlights: ev.highlights ?? null,
        departmentId: null,
      },
    });
  }
}

async function seedNews() {
  for (const n of newsData) {
    await prisma.newsArticle.upsert({
      where: { slug: n.slug },
      update: {
        title: n.title,
        excerpt: n.excerpt ?? null,
        image: n.image ?? null,
        date: toDate(n.date),
        author: n.author ?? null,
        category: n.category ?? null,
        tags: Array.isArray(n.tags) ? n.tags : [],
        readingTime: typeof n.readingTime === "number" ? n.readingTime : null,
        featured: !!n.featured,
        content: Array.isArray((n as any).content) ? (n as any).content : [],
        departmentId: null,
      },
      create: {
        slug: n.slug,
        title: n.title,
        excerpt: n.excerpt ?? null,
        image: n.image ?? null,
        date: toDate(n.date),
        author: n.author ?? null,
        category: n.category ?? null,
        tags: Array.isArray(n.tags) ? n.tags : [],
        readingTime: typeof n.readingTime === "number" ? n.readingTime : null,
        featured: !!n.featured,
        content: Array.isArray((n as any).content) ? (n as any).content : [],
        departmentId: null,
      },
    });
  }
}

async function seedResearch() {
  for (const r of researchProjects) {
    await prisma.researchProject.upsert({
      where: { slug: r.slug },
      update: {
        title: r.title,
        coordinator: r.coordinator,
        year: r.year,
        field: r.field ?? null,
        partners: Array.isArray(r.partners) ? r.partners : [],
        description: r.description,
        departmentId: null,
      },
      create: {
        slug: r.slug,
        title: r.title,
        coordinator: r.coordinator,
        year: r.year,
        field: r.field ?? null,
        partners: Array.isArray(r.partners) ? r.partners : [],
        description: r.description,
        departmentId: null,
      },
    });
  }
}

async function main() {
  console.log("Seeding Departments + Staff…");
  await seedDepartmentsAndStaff();

  console.log("Seeding Programs…");
  await seedPrograms();

  console.log("Seeding Events…");
  await seedEvents();

  console.log("Seeding News…");
  await seedNews();

  console.log("Seeding Research Projects…");
  await seedResearch();

  const counts = await Promise.all([
    prisma.department.count(),
    prisma.staff.count(),
    prisma.program.count(),
    prisma.event.count(),
    prisma.newsArticle.count(),
    prisma.researchProject.count(),
  ]);
  console.log(`Done. Counts => Departments:${counts[0]} Staff:${counts[1]} Programs:${counts[2]} Events:${counts[3]} News:${counts[4]} Research:${counts[5]}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
