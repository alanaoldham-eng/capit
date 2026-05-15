import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid gap-6 py-10 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="font-semibold text-navy-900">Cardano OnboardKit v001</p>
          <p className="mt-2">A deployable prototype for Cardano-native onboarding. No private keys stored by this v001 prototype.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/docs" className="hover:text-cardano-600">Developer docs</Link>
          <Link href="/dashboard" className="hover:text-cardano-600">Project dashboard</Link>
          <Link href="/passport" className="hover:text-cardano-600">Cardano Passport</Link>
        </div>
        <p>UX demo only. Production custody, minting, and sponsored transactions require backend services and security review.</p>
      </div>
    </footer>
  );
}
