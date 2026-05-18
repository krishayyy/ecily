import Hero from "@/components/Hero"
import WorldsScroll from "@/components/WorldsScroll"
import Features from "@/components/Features"
import WaitlistForm from "@/components/WaitlistForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <WorldsScroll />
      <Features />
      <WaitlistForm />
      <Footer />
    </main>
  )
}
