import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import AiForGood from "@/components/AiForGood"
import CredibilityMarquee from "@/components/CredibilityMarquee"
import FeaturedOn from "@/components/FeaturedOn"
import HackClubSponsor from "@/components/HackClubSponsor"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AiForGood />
      <CredibilityMarquee />
      <FeaturedOn />
      <HackClubSponsor />
      <Footer />
    </main>
  )
}
