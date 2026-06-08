import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import WorldsScroll from "@/components/WorldsScroll"
import Features from "@/components/Features"
import Chapters from "@/components/Chapters"
import Tournament from "@/components/Tournament"
import Sponsors from "@/components/Sponsors"
import WaitlistForm from "@/components/WaitlistForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WorldsScroll />
      <div id="app">
        <Features />
      </div>
      <Chapters />
      <Tournament />
      <Sponsors />
      <WaitlistForm />
      <Footer />
    </main>
  )
}
