import { CheckCircle2, Circle } from "lucide-react";

export type Quest = { label: string; complete: boolean; helper: string };

export default function QuestChecklist({ quests }: { quests: Quest[] }) {
  const completed = quests.filter((quest) => quest.complete).length;
  return (
    <section className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cardano-600">Beginner quests</p>
          <h2 className="mt-2 text-2xl font-bold text-navy-950">Passport progress</h2>
        </div>
        <p className="text-sm font-semibold text-slate-600">{completed}/{quests.length}</p>
      </div>
      <div className="mt-6 grid gap-3">
        {quests.map((quest) => (
          <div key={quest.label} className="flex gap-3 rounded-2xl border border-slate-200 p-4">
            {quest.complete ? <CheckCircle2 className="text-emerald-600" /> : <Circle className="text-slate-400" />}
            <div><p className="font-semibold text-navy-950">{quest.label}</p><p className="mt-1 text-sm text-slate-600">{quest.helper}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
