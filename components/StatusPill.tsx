import clsx from "clsx";

export default function StatusPill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" | "slate" }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", {
      "bg-blue-50 text-blue-700 ring-1 ring-blue-200": tone === "blue",
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200": tone === "green",
      "bg-amber-50 text-amber-800 ring-1 ring-amber-200": tone === "amber",
      "bg-slate-100 text-slate-700 ring-1 ring-slate-200": tone === "slate",
    })}>{children}</span>
  );
}
