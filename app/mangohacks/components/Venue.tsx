import { Button } from "@/components/ui/button"

const MAPS =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("4141 Hacienda Drive, Pleasanton, CA")

export function Venue() {
  return (
    <section id="venue" className="scroll-mt-20 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <img
          src="/mangohacks/images/felt/venue.webp"
          alt="The Zoho Corporation building in Pleasanton, rendered in felt"
          loading="lazy"
          className="w-full"
        />
        <div>
          <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">Zoho Corporation, Pleasanton</h2>
          <p className="mt-6 max-w-lg text-cream/70">
            A real office instead of a school gym. One room, one day, and everything you need already in it.
          </p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="font-display font-semibold text-mango">Address</dt>
              <dd className="text-cream">4141 Hacienda Drive, Pleasanton, California</dd>
            </div>
            <div>
              <dt className="font-display font-semibold text-mango">When</dt>
              <dd className="text-cream">Saturday, December 5, 2026, 8:00 AM to 8:30 PM</dd>
            </div>
          </dl>
          <Button asChild className="mt-8">
            <a href={MAPS} target="_blank" rel="noopener noreferrer">Get directions</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
