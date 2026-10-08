import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CONTACT_EMAIL } from "../config"
import { Heading, Section } from "./shared"

const FAQ = [
  { q: "What is a hackathon?", a: "A day where you build something from scratch with a small team, then show it off. There is no exam, no grade, and nothing to lose. Most people come in with no idea what they are making and leave with a thing that works." },
  { q: "Who can come?", a: "Any high-school student, plus early-college students. You do not need to be from a particular school, district, or club. You do not need a team either." },
  { q: "What if I have never written code?", a: "Then you are exactly who we built this for. Morning workshops start from zero, mentors are on the floor all day, and Best First Hack is a prize only first-timers can win." },
  { q: "What does it cost?", a: "Nothing. Entry, lunch, dinner, snacks, and stickers are all free. There is no breakfast." },
  { q: "Do I need a team or an idea?", a: "No to both. There is a team-forming block right after check-in, and teams are up to four people. Plenty of people show up alone." },
  { q: "How do I sponsor Mango Hacks?", a: "Email us a line about who you are and what you want out of it. We reply with a recommended tier and a short call, then it is an invoice and a logo file. Contributions run through our 501(c)(3) fiscal sponsorship, so they are tax-deductible in the US." },
]

export function Faq() {
  return (
    <Section id="faq" inner="grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-16">
      <div className="md:sticky md:top-28 md:self-start">
        <Heading
          title="Questions"
          lede={
            <>
              Anything else, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-mango underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </>
          }
        />
      </div>
      <Accordion type="single" collapsible className="w-full border-t border-white/10">
        {FAQ.map((f, i) => (
          <AccordionItem value={`q-${i}`} key={f.q}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
