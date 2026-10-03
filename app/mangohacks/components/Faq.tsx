import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ = [
  { q: "What is a hackathon?", a: "A day where you build something from scratch with a small team, then show it off. There is no exam, no grade, and nothing to lose. Most people come in with no idea what they are making and leave with a thing that works." },
  { q: "Who can come?", a: "Any high-school student, plus early-college students. You do not need to be from a particular school, district, or club. You do not need a team either." },
  { q: "What if I have never written code?", a: "Then you are exactly who we built this for. Morning workshops start from zero, mentors are on the floor all day, and Best First Hack is a prize only first-timers can win." },
  { q: "What does it cost?", a: "Nothing. Entry, meals, snacks, and stickers are all free, and there is hardware you can borrow for the day." },
  { q: "Do I need a team or an idea?", a: "No to both. There is a team-forming block right after check-in, and teams are up to four people. Plenty of people show up alone." },
  { q: "How do I sponsor Mango Hacks?", a: "Email us a line about who you are and what you want out of it. We reply with a recommended tier and a short call, then it is an invoice and a logo file. Contributions run through our 501(c)(3) fiscal sponsorship, so they are tax-deductible in the US." },
]

function Column({ items, prefix }: { items: typeof FAQ; prefix: string }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f, i) => (
        <AccordionItem value={`${prefix}-${i}`} key={f.q}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl">
          Frequently asked.
        </h2>
        <div className="mt-10 grid gap-x-12 md:grid-cols-2">
          <Column items={FAQ.slice(0, 3)} prefix="a" />
          <Column items={FAQ.slice(3)} prefix="b" />
        </div>
      </div>
    </section>
  )
}
