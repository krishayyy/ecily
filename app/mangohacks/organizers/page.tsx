import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"
import { Organizers } from "../components/Organizers"

export const metadata = { title: "Meet the Organizers | Mango Hacks" }

export default function OrganizersPage() {
  return <main className="min-h-screen pt-8">
    <div className="mx-auto max-w-6xl px-6">
      <Link href="/mangohacks" className="inline-flex items-center gap-2 font-display font-semibold text-cream/80 hover:text-mango"><ArrowLeft weight="bold" /> Mango Hacks</Link>
    </div>
    <Organizers />
    <p className="mx-auto max-w-6xl px-6 pb-16 text-sm text-cream/50">Additional responsibilities and profile links will be updated as they are confirmed.</p>
  </main>
}
