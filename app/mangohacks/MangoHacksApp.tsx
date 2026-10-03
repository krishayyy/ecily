import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { Stats } from "./components/Stats"
import { About } from "./components/About"
import { Venue } from "./components/Venue"
import { Tracks } from "./components/Tracks"
import { Schedule } from "./components/Schedule"
import { Sponsors } from "./components/Sponsors"
import { Faq } from "./components/Faq"
import { BigCta } from "./components/BigCta"
import { Footer } from "./components/Footer"
import { Companion } from "./components/Companion"

export default function MangoHacksApp() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Venue />
        <Tracks />
        <Schedule />
        <Sponsors />
        <Faq />
        <BigCta />
      </main>
      <Footer />
      <Companion />
    </>
  )
}
