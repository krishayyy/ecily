import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Mission from "@/components/Mission"
import Segments from "@/components/Segments"
import WaitlistForm from "@/components/WaitlistForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Mission />
      <Segments />
      <WaitlistForm />
      <Footer />
    </main>
  )
}
