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

type FlatCurrItem = {
  year: number;
  semester: number;
  title: string;
  credits?: number;
  order?: number;
};

function readCourse(c: any): { title: string; credits?: number } | null {
  if (!c) return null;

  if (typeof c === "string") {
    const t = c.trim();
    const num = t.match(/\b(\d{1,2})\b/);
    const title = t.replace(/\s*\(?\d{1,2}\s*(ECTS|credits?)?\)?/i, "").trim();
    return { title, credits: num ? Number(num[1]) : undefined };
  }

  if (typeof c === "object") {
    const title = String(c.title ?? c.name ?? c.course ?? c.label ?? "").trim();
    if (!title) return null;
    const credits = c.credits ?? c.ects ?? c.points;
    return { title, credits: credits != null ? Number(credits) : undefined };
  }

  return null;
}

function flattenCurriculum(curr: any): FlatCurrItem[] {
  const out: FlatCurrItem[] = [];
  if (!curr) return out;

  const yearsArr =
    Array.isArray(curr?.years) ? curr.years :
    Array.isArray(curr) ? curr :
    (typeof curr === "object" ? Object.values(curr) : []);

  yearsArr.forEach((yObj: any, yi: number) => {
    const yearNum = Number(yObj?.year ?? yi + 1);
    const sems =
      Array.isArray(yObj?.semesters) ? yObj.semesters :
      Array.isArray(yObj) ? yObj :
      (typeof yObj === "object" ? Object.values(yObj) : []);

    sems.forEach((sObj: any, si: number) => {
      const semNum = Number(sObj?.semester ?? si + 1);
      const courses =
        Array.isArray(sObj?.courses) ? sObj.courses :
        Array.isArray(sObj) ? sObj :
        (typeof sObj === "object" ? Object.values(sObj) : []);

      let order = 0;
      courses.forEach((raw: any) => {
        const parsed = readCourse(raw);
        if (!parsed || !parsed.title) return;
        order += 1;
        out.push({
          year: yearNum,
          semester: semNum,
          title: parsed.title,
          credits: parsed.credits,
          order,
        });
      });
    });
  });

  return out;
}

function normalizeStrArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(Boolean) as string[];
  if (typeof value === "string") {
    return value.split(",").map(s => s.trim()).filter(Boolean);
  }
  return [];
}

function defaultBio(name: string, title?: string | null) {
  const role = title ? title.toLowerCase() : "faculty member";
  return `${name} is a ${role} at the Faculty of Business and Law, focusing on teaching, research, and community impact.`;
}

const EXPERTISE_POOL = [
  "Business Strategy", "Corporate Law", "Digital Marketing", "Data Analysis",
  "Econometrics", "Public Policy", "Entrepreneurship", "Accounting", "Finance",
  "Information Systems", "AI in Business", "International Law"
];

function pickSome<T>(arr: T[], min: number, max: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  const k = Math.max(min, Math.min(max, copy.length));
  return copy.slice(0, k);
}

function defaultPublications(name: string) {
  return [
    `${name} (2023). Emerging Trends in Digital Transformation. Journal of Business & Tech.`,
    `${name} (2022). Corporate Governance in SMEs. European Management Review.`,
  ];
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

    if (Array.isArray(dep.staff)) {
      for (const s of dep.staff) {
        const officePhone =
          (s as any).officePhone ??
          (s as any).office_phone ??
          null;

        const bio =
          (s as any).bio ??
          defaultBio(s.name, s.title ?? null);

        const expertise = (() => {
          const arr = normalizeStrArray((s as any).expertise);
          return arr.length ? arr : pickSome(EXPERTISE_POOL, 2, 4);
        })();

        const publications = (() => {
          const arr = normalizeStrArray((s as any).publications);
          return arr.length ? arr : defaultPublications(s.name);
        })();

        await prisma.staff.upsert({
          where: { slug: s.slug },
          update: {
            name: s.name,
            title: s.title ?? null,
            isFullTime: typeof s.fullTime === "boolean" ? s.fullTime : null,
            photoUrl: s.img ?? null,
            email: s.email ?? null,
            office: s.office ?? null,
            officePhone,
            bio,
            expertise,
            publications,
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
            officePhone,
            bio,
            expertise,
            publications,
            departmentId: department.id,
          },
        });
      }
    }
  }
}

async function seedCourses() {
  const catalog = [
    { title: "Business Law", credits: 6 },
    { title: "Corporate Governance", credits: 5 },
    { title: "Commercial Contracts", credits: 5 },
    { title: "Entrepreneurship", credits: 6 },
    { title: "Digital Marketing", credits: 4 },
    { title: "Statistics for Business", credits: 5 },
    { title: "Research Methods", credits: 4 },
  ];

  for (const c of catalog) {
    await prisma.course.upsert({
      where: { title: c.title },
      update: { credits: c.credits },
      create: c,
    });
  }
}

function pickRandom<T>(arr: T[], n: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

async function assignRandomCoursesToStaff() {
  const staff = await prisma.staff.findMany({ select: { id: true } });
  const courses = await prisma.course.findMany({ select: { id: true } });

  for (const s of staff) {
    const k = Math.min(2 + Math.floor(Math.random() * 3), courses.length); 
    const chosen = pickRandom(courses, k);

    await prisma.staff.update({
      where: { id: s.id },
      data: {
        courses: {
          set: chosen.map(c => ({ id: c.id })),
        },
      },
    });
  }
}

async function seedPrograms() {
  const depts = await prisma.department.findMany({
    select: { id: true, code: true, slug: true },
  });
  const byCode = new Map(depts.map(d => [d.code, d.id]));
  const bySlug = new Map(depts.map(d => [d.slug, d.id]));

  for (const p of allPrograms) {
    const deptId =
      ((p as any).departmentCode && byCode.get((p as any).departmentCode)) ||
      ((p as any).departmentSlug && bySlug.get((p as any).departmentSlug)) ||
      null;

    if (!deptId) {
      console.warn(
        `⚠️  No department match for program "${p.name}" (code: ${(p as any).departmentCode}, slug: ${(p as any).departmentSlug}). Skipping.`
      );
      continue;
    }

    // 1) Upsert the program, keep id
    const programRow = await prisma.program.upsert({
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
      select: { id: true, slug: true },
    });

    // 2) Clear any existing ProgramCourse rows for this program
    await prisma.programCourse.deleteMany({ where: { programId: programRow.id } });

    // 3) Flatten the curriculum JSON
    const rawCurr =
      (p as any).curriculum ??
      (p as any).curriculumJson ??
      (p as any).curriculumJSON ??
      null;

    const flat = flattenCurriculum(rawCurr);
    console.log(`[seed] ${programRow.slug}: flattened rows = ${flat.length}`);

    // 4) If no JSON rows, auto-generate a reasonable curriculum so table isn’t empty
    if (flat.length === 0) {
      try {
        console.warn(
          `[seed] ${programRow.slug}: NO curriculum JSON. preview:`,
          JSON.stringify(rawCurr)?.slice(0, 300)
        );
      } catch {}

      const yearsByLevel: Record<ProgramLevel, number> = {
        BACHELOR: 3,
        PROFESSIONAL_MASTER: 2,
        MASTER_OF_SCIENCE: 2,
        INTEGRATED_MASTER: 5,
      };
      const years = yearsByLevel[mapLevel(p.level)];

      const allCourses = await prisma.course.findMany({
        select: { id: true, credits: true },
      });

      let order = 0;
      for (let y = 1; y <= years; y++) {
        for (let s = 1; s <= 2; s++) {
          const chosen = pickSome(allCourses, 4, Math.min(6, allCourses.length));
          for (const c of chosen) {
            order += 1;
            await prisma.programCourse.create({
              data: {
                programId: programRow.id,
                courseId: c.id,
                year: y,
                semester: s,
                order,
                ects: c.credits,
              },
            });
          }
        }
      }
      // Go to next program
      continue;
    }

    // 5) Normal path: create rows from flattened JSON
    for (const item of flat) {
      const course = await prisma.course.upsert({
        where: { title: item.title },
        update: { credits: item.credits ?? undefined },
        create: { title: item.title, credits: item.credits ?? 6 },
        select: { id: true, credits: true },
      });

      await prisma.programCourse.create({
        data: {
          programId: programRow.id,
          courseId: course.id,
          year: item.year,
          semester: item.semester,
          order: item.order ?? null,
          ects: item.credits ?? course.credits,
        },
      });
    }
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
  await seedDepartmentsAndStaff();
  await seedCourses();
  await assignRandomCoursesToStaff();

  await seedPrograms();
  await seedEvents();
  await seedNews();
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
