import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import AiForGood from "@/components/AiForGood"
import CredibilityMarquee from "@/components/CredibilityMarquee"
import FeaturedOn from "@/components/FeaturedOn"
import Mission from "@/components/Mission"
import Features from "@/components/Features"
import Chapters from "@/components/Chapters"
import WaitlistForm from "@/components/WaitlistForm"
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
      <Mission />
      <div id="app">
        <Features />
      </div>
      <Chapters />
      <WaitlistForm />
      <HackClubSponsor />
      <Footer />
    </main>
  )
}
