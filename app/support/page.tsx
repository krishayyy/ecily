import type { Metadata } from "next"
import { LegalLayout, LegalCard, LegalSectionHeading } from "@/components/LegalLayout"

export const metadata: Metadata = {
  title: "Support — Ecily",
  description: "Get help with Ecily — contact us, report a bug, or request account deletion.",
}

export default function SupportPage() {
  return (
    <LegalLayout eyebrow="Help" title="Support" updated="July 2026">
      <LegalCard title="Contact Us">
        For any question, bug report, or feedback, email{" "}
        <a href="mailto:joinecily@gmail.com" className="text-slate underline">
          joinecily@gmail.com
        </a>
        . We read every message and typically respond within 2 business days.
      </LegalCard>

      <LegalSectionHeading>Common Questions</LegalSectionHeading>

      <LegalCard title="How do I delete my account?">
        In the app, go to Settings → Account → Delete Account. This permanently removes your
        personal data within 30 days. You can also request deletion by emailing{" "}
        <a href="mailto:joinecily@gmail.com" className="text-slate underline">
          joinecily@gmail.com
        </a>
        .
      </LegalCard>
      <LegalCard title="Is my trading real money?">
        No. Ecily is a paper-trading simulator for learning — no real money, brokerage account, or
        real trades are ever involved.
      </LegalCard>
      <LegalCard title="I found a bug or something looks wrong.">
        Email{" "}
        <a href="mailto:joinecily@gmail.com" className="text-slate underline">
          joinecily@gmail.com
        </a>{" "}
        with your device model and iOS version if you can, plus what you were doing when it
        happened. Screenshots help a lot.
      </LegalCard>
      <LegalCard title="How do I reset my streak or progress?">
        Progress and streaks aren't user-resettable in-app today. Email support and we can help
        manually.
      </LegalCard>

      <LegalSectionHeading>More</LegalSectionHeading>

      <LegalCard title="Privacy Policy" accent="#7B8FD4">
        See our{" "}
        <a href="/privacy" className="text-slate underline">
          Privacy Policy
        </a>{" "}
        for what we collect and why.
      </LegalCard>
      <LegalCard title="Terms of Service" accent="#7B8FD4">
        See our{" "}
        <a href="/terms" className="text-slate underline">
          Terms of Service
        </a>
        .
      </LegalCard>
    </LegalLayout>
  )
}
