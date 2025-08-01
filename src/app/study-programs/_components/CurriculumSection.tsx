"use client";

import { BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CurriculumSection({ curriculum }: {
  curriculum: Record<string, { code: string; title: string; credits: number }[]>;
}) {
  const semesters = Object.keys(curriculum);

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-blue-950 w-6 h-6" />
        <h2 className="text-xl font-bold text-blue-950">Sample Curriculum</h2>
      </div>

      <Tabs defaultValue={semesters[0]} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          {semesters.map((sem) => (
            <TabsTrigger key={sem} value={sem}>
              {sem.replace("viti", "Viti ").replace("s", " - Semestri ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {semesters.map((sem) => (
          <TabsContent key={sem} value={sem}>
            <CurriculumTable modules={curriculum[sem]} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function CurriculumTable({ modules }: {
  modules: { code: string; title: string; credits: number }[];
}) {
  return (
    <table className="w-full text-sm border border-zinc-300 rounded overflow-hidden">
      <thead className="bg-zinc-100">
        <tr>
          <th className="text-left p-2 border-b">Kodi</th>
          <th className="text-left p-2 border-b">Përshkrimi</th>
          <th className="text-right p-2 border-b">Kredite</th>
        </tr>
      </thead>
      <tbody>
        {modules.map((m, i) => (
          <tr key={i} className="border-t">
            <td className="p-2 font-mono text-xs text-zinc-700">{m.code}</td>
            <td className="p-2 text-zinc-800">{m.title}</td>
            <td className="p-2 text-right font-medium text-zinc-900">{m.credits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
