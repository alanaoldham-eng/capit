import Link from "next/link";
import { WalletCards } from "lucide-react";

const links = [
  ["Passport", "/passport"],
  ["Claims", "/claim/founders-badge"],
  ["Dashboard", "/dashboard"],
  ["Docs", "/docs"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-navy-950">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-navy-900 text-white"><WalletCards size={20} /></span>
          <span>Cardano OnboardKit</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-cardano-600">{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
