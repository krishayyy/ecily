import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import ScrollStat from "@/components/ScrollStat"
import CredibilityMarquee from "@/components/CredibilityMarquee"
import FeaturedOn from "@/components/FeaturedOn"
import WorldsScroll from "@/components/WorldsScroll"
import Mission from "@/components/Mission"
import WhyItMatters from "@/components/WhyItMatters"
import Features from "@/components/Features"
import Chapters from "@/components/Chapters"
import WaitlistForm from "@/components/WaitlistForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ScrollStat />
      <CredibilityMarquee />
      <FeaturedOn />
      <WorldsScroll />
      <Mission />
      <WhyItMatters />
      <div id="app">
        <Features />
      </div>
      <Chapters />
      <WaitlistForm />
      <Footer />
    </main>
  )
}
